/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { loadJS } from "@web/core/assets";

import { _lt } from "@web/core/l10n/translation";

const { Component, onWillStart, useState, useEffect, useRef} = owl;

export class WebGoogleMapWidget extends Component {
    setup() {
        var self = this;

        this.rpc = useService("rpc");
        this.notification = useService("notification");
        this.mapContainerRef = useRef("mapContainer");

        this.state = useState({
            width: this.props.width || "",
            height: this.props.height || "",
            latitude_field : this.props.record.data[this.props.latitude_field] || "",
            longitude_field : this.props.record.data[this.props.longitude_field] || "",
        });

        useEffect(
            () => {
                if (typeof google === 'object' && typeof google.maps === 'object') {
                    self.gmap = new google.maps.Map(this.mapContainerRef.el, {
                        center: { lat: this.state.latitude_field, lng: this.state.longitude_field },
                        mapTypeId: google.maps.MapTypeId.ROADMAP,                
                        fullscreenControl: true,
                        mapTypeControl: true,
                        gestureHandling: 'cooperative',
                        mapTypeControlOptions: {
                            mapTypeIds: ['satellite', 'hybrid', 'terrain'],
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        },
                        zoom: 3,
                        minZoom: 3,
                        maxZoom: 20,
                    });
                    if(self.gmap){
                        self.marker = new google.maps.Marker({
                            map: self.gmap,
                            draggable: true,
                            animation: google.maps.Animation.DROP,
                            position:  { lat: this.state.latitude_field, lng: this.state.longitude_field },
                        });

                        var latlng = new google.maps.LatLng(this.state.latitude_field, this.state.longitude_field);
                        self.gmap.setCenter(latlng);

                        google.maps.event.addListener(self.marker, 'dragstart', function(event) {
                            self.setLocation(event);
                        });
            
                        google.maps.event.addListener(self.marker, 'drag', function(event) {
                            self.setLocation(event);
                        });
            
                        google.maps.event.addListener(self.marker, 'dragend', function(event) {
                            self.setLocation(event);
                        });
            
                        google.maps.event.addListener(self.gmap, 'click', function(event) {
                            self.marker.setPosition(event.latLng);
                            self.gmap.panTo(self.marker.getPosition());
                            self.setLocation(event);
                        });
                    }
                }else{
                    this.notification.add(
                        this.env._t('Google Map API is not loaded.')
                    );
                    return;
                }
            },
            () => []
        );

        useEffect(
            (el) => {
                if (!el) {
                    return;
                }
                if (self.state.width){
                    el.style.width = self.state.width;
                }else{
                    el.style.width = '425px';
                }
                if (self.state.height){
                    el.style.height = self.state.height;
                }else{
                    el.style.height = '300px';
                }
            },
            () => [document.querySelector('.o_field_web_google_map_widget')]
        );

        onWillStart(this.onWillStart);
    }

    async onWillStart() {
        var self = this;
        const key = await this._getGmapAPIKey();
        try {
            await loadJS(`https://maps.googleapis.com/maps/api/js?key=${key}`);
        } catch (e) {
            return false;
        }
    }

    async _getGmapAPIKey() {
        if (!this._gmp_api_key_prom) {
            this._gmp_api_key_prom = new Promise(async resolve => {
                const data = await this.rpc('/web_google_map_widget/_get_gmap_api_key');
                resolve(JSON.parse(data).gmap_api_key || '');
            });
        }
        return this._gmp_api_key_prom;
    }

    setLocation(event) {
        var self = this;
        var changes = {};

        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        
        if (self.props.latitude_field != undefined && self.props.longitude_field != undefined){
            changes[self.props.latitude_field] = lat;
            changes[self.props.longitude_field] = lng;
            self.props.record.update(changes);
        }
    }
}
WebGoogleMapWidget.template = "WebGoogleMapWidget";
WebGoogleMapWidget.displayName = _lt("Map");
WebGoogleMapWidget.supportedTypes = ["text"];
WebGoogleMapWidget.extractProps = ({ attrs }) => {
    return {
        width: attrs.options.width || '100%',
        height: attrs.options.height || '550px',
        latitude_field:  attrs.options.latitude_field,
        longitude_field: attrs.options.longitude_field,
    };
};
registry.category("fields").add('web_google_map_widget', WebGoogleMapWidget);
