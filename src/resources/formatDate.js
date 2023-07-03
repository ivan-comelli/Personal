"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const formatDate = (date) => {
    return (0, date_fns_1.format)(date, 'dd MMMM yyyy', { locale: locale_1.es });
};
exports.formatDate = formatDate;
