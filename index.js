// function writeObj(obj) {
//     var description = '{';
//     $.each(obj, function(c,p) {
//         // description += '"' + p + '":['
//         // $.each(clsit, function(idnex, c) {
//         //     description += '"' + c + '",';
//         // })
//         // if (description.slice(-1) == ',') description = description.slice(0, description.length - 1);
//         // description += '],';
//         description += '"' + c + '":' + p+','
//     })
//     description = description.slice(0, description.length - 1)
//     description += '}';
//     console.log(description);
// }
// writeObj(c_c)
// 


var model = {
    provinces: provinces,
    p_c: p_c,
    c_c: c_c,
    c_p: c_p,
    nowProvince: "",
    nowCity: "",
    nowCounty: "",
    nowPrice: "",
}

var controllers = {
    getList: function(target) {
        if (target == 'province') {
            return model.provinces;
        } else if (target == 'city') {
            return model.p_c[model.nowProvince];
        } else if (target == 'county') {
            return model.c_c[model.nowCity];
        } else if (target == 'price') {
            return model.c_p[model.nowCounty] || model.c_p[model.nowCity];
        }
    },
    getOptions: function(target) {
        var optionStr = '';
        optionStr += '<option value="' + "" + '">' + "" + '</option>';
        $.each(this.getList(target), function(index, item) {
            optionStr += '<option value="' + item + '">' + item + '</option>';
        })
        return optionStr;
    },
    getPrice: function() {
        if (model.nowCounty) {
            model.nowPrice = model.c_p[model.nowCounty];
        } else if (model.nowCity) {
            model.nowPrice = model.c_p[model.nowCity];
        } else {
            model.nowPrice = "价格";
        }
        return model.nowPrice;
    },

    setNowProvince: function(province) {
        model.nowProvince = province;
        cityView.render();
    },
    setNowCity: function(city) {
        model.nowCity = city;
        countyView.render();
        priceView.render();
    },
    setNowCounty: function(county) {
        model.nowCounty = county;
        priceView.render();
    },
    setNowPrice: function(price) {
        model.nowPrice = price;
        // cityView.render();
    },
    init: function() {
        provinceView.init();
        cityView.init();
        countyView.init();
        priceView.init();
        provinceView.render();
        cityView.render();
        countyView.render();
        // this.setNowProvince(model.provinces[0]);
    }
}

var a = '';
var provinceView = {
    init: function() {
        this.provinceSelect = $("#province");
        this.provinceSelect.change(function(e) {
            controllers.setNowProvince(e.target.value);
        })
    },

    render: function() {
        this.provinceSelect.html(controllers.getOptions('province'));
        // this.provinceSelect[0].selectedIndex = -1;
    }
}
var cityView = {
    init: function() {
        this.citySelect = $("#city");
        this.citySelect.change(function(e) {
            controllers.setNowCity(e.target.value);
        })
    },
    render: function() {
        this.citySelect.html(controllers.getOptions('city'))
        // this.citySelect[0].selectedIndex = -1;
    }
}
var countyView = {
    init: function() {
        this.countySelect = $("#county");
        this.countySelect.change(function(e) {
            controllers.setNowCounty(e.target.value);
        })
    },
    render: function() {
        this.countySelect.html(controllers.getOptions('county'))
        // this.countySelect[0].selectedIndex = -1;
    }
}
var priceView = {
    init: function() {
        this.priceEle = $('#price');
    },
    render: function() {
        this.priceEle.text(controllers.getPrice());
    }
}

controllers.init();