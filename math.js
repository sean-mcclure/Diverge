az.style_page({
    "padding" : "0px",
    "margin" : "0px",
    "-webkit-user-select:": "none",
	"-moz-user-select": "none",
	"-ms-user-select": "none",
	"-o-user-select": "none",
	"user-select": "none"
})

az.style_body({
    "padding" : "0px",
    "margin" : "0px"
})

az.add_sections({
    "this_class": "my_section",
    "sections": 1
})

az.style_sections("my_section", 1, {
    "height": "100vh",
    "width" : "100vw",
    "background" : "#d1ccc0"
})

az.add_layout("my_section", 1, {
    "this_class": "my_layout",
    "row_class": "my_layout_rows",
    "cell_class": "my_layout_cells",
    "number_of_rows": 3,
    "number_of_columns": 1
})

az.style_layout("my_layout", 1, {
    "height": "auto",
    "width" : "90vw",
    "align" : "center",
    "border": 0
})

az.all_style_layout("my_layout_cells", {
    "halign" : "center"
})


az.add_slider("my_layout_cells", 2, {
    "this_class" : "my_slider",
    "min_value" : 0,
    "max_value" : 1000000,
    "default_value" : 0
})

az.style_slider("my_slider", 1, {
    "width" : "70%",
    "outline" : 0,
    "color" : "black",
    "-webkit-user-select:": "none",
	"-moz-user-select": "none",
	"-ms-user-select": "none",
	"-o-user-select": "none",
	"user-select": "none"
})

az.add_html("my_layout_cells", 3, {
    "html" : "<div id='hold_plot'></div>"
})

setTimeout(function() {
    az.trigger_event("my_slider", 1, {
        "event" : "change"
    })
}, 1000)

az.add_event("my_slider", 1, {
    "type" : "as_change",
    "function" : function() {
        const slider_value = Number(az.grab_value("my_slider", 1));
        var res = [];
        var sum = 0;
         
        az.call_multiple({
            "iterations" : slider_value,
            "function" : function(dummy, index) {
                var index = index + 1;
                sum += (index / ((index * Math.sqrt(index + 1)) + ((index + 1) * Math.sqrt(index))))
                res.push(sum)
            }
        })

        var trace = {
        x: az.create_array(1, slider_value),
        y: res,
        type: 'scatter'
        };

        var data = [trace];

        var config = {responsive: true}

        layout = {width: 1000}

        Plotly.newPlot("hold_plot", data, layout, config);
        
    }
})
