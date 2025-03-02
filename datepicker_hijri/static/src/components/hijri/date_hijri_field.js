/* @odoo-module */

import {registry} from "@web/core/registry"
import { loadJS } from "@web/core/assets"
import { standardFieldProps } from "@web/views/fields/standard_field_props"
const { Component, onWillStart, onMounted } = owl
const { DateTime } = luxon

let hijriDatePickerId = 0

class DateHijriField extends Component {
    setup() {
        console.log("This is a hijri date picker")
        console.log(this.props.value)
        this.hijriDatePickerId = `hijri_datepicker_${hijriDatePickerId++}`

        onWillStart(async () => {
            await loadJS("datepicker_hijri/static/src/components/lib/bootstrap-hijri-datepicker.js")
        })

        onMounted(() => {
            $(`#${this.hijriDatePickerId}`).hijriDatePicker({
                hijri: true,
                format: 'DD/MM/YYYY',
                hijriFormat: 'iDD/iMM/iYYYY',
            })
        })
    }

    onBlur(e){
        if (e.target.value) {
            const date = DateTime.fromFormat(e.target.value, "dd/MM/yyyy")
            this.props.update(date)
        } else {
            if (this.props.value) this.props.update(false)
        }
        
    }

    get formattedValue() {
        return this.props.value ? this.props.value.toFormat("dd/MM/yyyy") : ""
    }

}

DateHijriField.template = "datepicker_hijri.DateHijriField"
DateHijriField.props = {
    ...standardFieldProps
}

DateHijriField.displayName = "Date Hijri Field"
DateHijriField.supportedTypes = ["date"]

registry.category("fields").add("date_hijri", DateHijriField)