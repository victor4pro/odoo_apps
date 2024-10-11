# -*- coding: utf-8 -*-
#################################################################################
# Author      : CFIS (<https://www.cfis.store/>)
# Copyright(c): 2017-Present CFIS.
# All Rights Reserved.
#
#
#
# This program is copyright property of the author mentioned above.
# You can`t redistribute it and/or modify it.
#
#
# You should have received a copy of the License along with this program.
# If not, see <https://www.cfis.store/>
#################################################################################

{
    "name": "Map Widget | Google Map Widget",
    "summary": """
        This odoo module helps to add the map widget in any form views using existing latitude and longitude fields. 
        The module allows you to mark the location on the map by dragging the marker.
        """,
    "version": "16.0.1",
    "description": """
        This odoo module helps to add the map widget in any form views using existing latitude and longitude fields. 
        The module allows you to mark the location on the map by dragging the marker.
        Map Widget
        Google Map Widget
        """,    
    "author": "CFIS",
    "maintainer": "CFIS",
    "license" :  "Other proprietary",
    "website": "https://www.cfis.store",
    "images": ["images/web_google_map_widget.png"],
    "category": "Extra Tools",
    "depends": [
        "base",
        "contacts",
        "base_geolocalize",
    ],
    "data": [
        "views/res_partner_views.xml",
        "views/res_config_settings.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "/web_google_map_widget/static/src/js/*.js", 
            "/web_google_map_widget/static/src/css/*.css",
            "/web_google_map_widget/static/src/xml/*.xml",
        ],
    },
    "installable": True,
    "application": True,
    "price"                 :  13,
    "currency"              :  "EUR",
    "pre_init_hook"         :  "pre_init_check",
}