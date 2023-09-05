# -*- coding: utf-8 -*-

from odoo import fields, models


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    product_brand = fields.Char('Brand', related='product_id.product_brand_id.name')
