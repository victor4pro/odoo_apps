from odoo import api, fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'
    
    google_map_widget_api_key = fields.Char(string='Google Maps View Api Key',config_parameter='web_google_map_widget.gmap_api_key')