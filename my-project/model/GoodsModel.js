var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//创建文档的定义
var Goods = new Schema({
    goods_name  : String,
    goods_sn    : String,
    goods_price : String,
    is_best     : String,
    is_new     : String,
    is_hot     : String,
    is_on_sale      : String,
    virtual_sales  : String,
    goods_number   : String,
    goods_img01Name  : String,
    goods_img02Name  : String,
    create_date :  { type: Date, default: Date.now }
});

//创建model对象，与数据库中的文档（表）映射
var GoodsModel = mongoose.model("goods",Goods);

module.exports = GoodsModel;