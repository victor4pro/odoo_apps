# Copyright (C) 2019 Open Source Integrators
# <https://www.opensourceintegrators.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
{
    'name': 'Datepicker Hijri',
    'version': '16.0.0.0.1',
    'category': 'Tools',
    'license': 'AGPL-3',
    'summary': 'Datepicker Hijri',
    'author': 'victor4pro',
    'website': '',
    'depends': [
        'web',
        'sale',
        "app_televentas"
    ],
    'data': [
        'views/sale_order.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'datepicker_hijri/static/src/components/hijri/date_hijri_field.js',
            'datepicker_hijri/static/src/components/hijri/date_hijri_field.xml'
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
    "sequence": 399
}
