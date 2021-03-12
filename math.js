az.style_page({
    "padding" : "0px",
    "margin" : "0px",
    "background" : "#d1ccc0"
})

az.style_body({
    "padding" : "0px",
    "margin" : "0px",
    "background" : "#d1ccc0"
})

az.add_sections({
    "this_class": "my_section",
    "sections": 1
})

az.style_sections("my_section", 1, {
    "height": "auto",
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
    "max_value" : 10000,
    "default_value" : 0,
    "text_class" : "show_value"
})

az.style_slider("my_slider", 1, {
    "width" : "90%",
    "outline" : 0,
    "color" : "black",
    "margin-bottom" : "20px",
    "margin-top" : "-20px"
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

        var config = {
                responsive: true,
                displayModeBar: false
            }

        if(!az.check_for_mobile()) {
            var use_width = 1000;
        } else {
            var use_width = 350;
        }
        layout = {
            width: use_width,
            plot_bgcolor: "transparent",
            paper_bgcolor: "transparent",
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 30,
                pad: 0
            }
        }

        Plotly.newPlot("hold_plot", data, layout, config);
        
    }
})
