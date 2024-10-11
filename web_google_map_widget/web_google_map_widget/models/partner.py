from odoo import api, fields, models, _

class ResPartner(models.Model):
    _inherit = 'res.partner'

    gmap_widget = fields.Text(string='Geolocation Map')