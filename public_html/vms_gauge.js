/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gauges = [];

function vmsGauge(
        parentElement, 
        name, 
        dataPath, 
        factor, 
        minValue, 
        maxValue, 
        height, 
        width,
        top,
        left){
    
    var parameters = {
        'type': 'gauge',
        'parentElement': parentElement,
        'name' : name, 
        'dataPath': dataPath, 
        'factor': factor, 
        'minValue': minValue, 
        'maxValue': maxValue,
        'height': height,
        'width': width,
        'top': top,
        'left': left
        };
    
    alert("vms_gauge");
    
    this.JSONString = JSON.stringify(parameters);
    
    this.type = 'gauge';
    this.name = name;
    this.dataPath = dataPath;
    this.factor = factor;
    this.value = 0;
    this.minValue = minValue;
    this.maxValue = maxValue;   
    this.height = height;
    this.width = width;
    this.top = top; 
    this.left = left;
    
    this.parent = document.getElementById(parentElement);
    this.frame = document.createElement('div');
    
    this.frame.setAttribute('id', name + 'GaugeFrame');
    this.frame.className = 'gaugeFrame';
//    this.frame.className = 'draggable';
    this.frame.style.position = 'absolute';
    this.frame.style.top = top + 'px';
    this.frame.style.left = left + 'px';
    this.parent.appendChild(this.frame);
    
    this.gauge = Raphael( name + 'GaugeFrame', width, height);
//    this.gauge = Raphael( left, top, width, height);
//    this.gauge = Raphael(0,0,viewWidth, viewHeight)
//    this.gauge = Raphael(left, top, viewWidth, height )

    this.gauge.setStart();
    
    //Bezel
    this.gauge.circle(width/2, height/2, width/2 - 5).attr({
        "stroke-width": 7,
        "stroke": "#000000",
        "fill": "#000000"
    });
    
    this.gauge.circle(width/2, height/2, width/2 - 5).attr({
        "stroke-width": 5,
        "stroke": "#737373"
    });
    
    this.gauge.circle(width/2-2, height/2, width/2 - 5).attr({
        "stroke-width": 2,
        "stroke": "#e6e6e6"
    });
    
    //Tick Values   
    for (i = 3; i <= 9; i++) {
        var a = Number(45 * Math.PI /180) * i;
        var r = width/3.15 - 5;
        
        x = width/2 + r * Math.cos(a);
        y = height/2 + 3 + r * Math.sin(a) - 4;

        var tickValue = ((maxValue - minValue)/6) * (i - 3);
        tickValue = tickValue.toFixed(0);
        var fontSize = width/11;
        this.gauge.text(x,y, tickValue).attr({
            "stroke": "white",
            "fill": "white",
            "font-size": fontSize
            });
        }; 
        
    //Tick Marks Major    
    for (i = 3; i <= 9; i++) {
        var a = Number(45 * Math.PI /180) * i;
        
        var r = width /2.5 - 5;
        x1 = width/2 + r * Math.cos(a);
        y1 = height/2 + 3 + r * Math.sin(a) - 3;

        var r = width/2.25 - 5;
        x2 = width/2 + r * Math.cos(a);
        y2 = height/2 + 3 + r * Math.sin(a) - 3;

        this.gauge.path(["M", x1, y1, "L", x2, y2]).attr({
            "stroke-width": 3,
            "stroke": "white"
            });
        }; 

    //Tick Marks Minor    
    var start = 55;

    for (i = start; i <= start + 30; i++) {
        var a = Number(9 * Math.PI /180) * i;
        
        var r = width /2.40 - 5;
        x1 = width/2 + r * Math.cos(a);
        y1 = height/2 + 3 + r * Math.sin(a) - 3;

        var r = width/2.25 - 5;
        x2 = width/2 + r * Math.cos(a);
        y2 = height/2 + 3 + r * Math.sin(a) - 3;

        this.gauge.path(["M", x1, y1, "L", x2, y2]).attr({
            "stroke-width": 1,
            "stroke": "white"
            });
        }; 
    
    //Gauge Title
    this.title = this.gauge.text(width/2 ,height/2 + width/4 * 1.25, name);
    this.title.attr("stroke", "white");
    this.title.attr("fill", "white");
    this.title.attr("font-size",fontSize - 5);
    
    x1 = width/2 - 7;
    y1 = height/2;
    
    x2 = width/2;
    y2 = height/2 - (height/2 * .75);
    
    x3 = width/2 + 7;
    y3 = width/2;
    
    this.gauge.path(["M", x1, y1, "L", x2, y2, "L", x3, y3]).attr({
        "fill": "#ff9900"
    }).id = "needle";
    
//    this.needle = this.gauge.path(["M", x1, y1, "L", x2, y2, "L", x3, y3]);
//    this.needle.attr({
//        "fill": "#ff9900"
//        });
    
//    this.needle.animate({transform: ["R", 45, width/2, height/2]}, 1000, "<>");
    
    //Pointer hub
    this.gauge.circle(width/2, height/2, width/10).attr({
      "fill": "90-#000000-#ffffff:95"
    });

    this.gaugeSet = this.gauge.setFinish(); 
    this.gaugeSet.id = name;
    
    this.setValue = function (newValue){
//        console.log("gauge newValue " + newValue);
        range = maxValue - minValue;
        newValue = Number(newValue) * Number(this.factor);
        newValue = newValue.toFixed(2) - (range/2) ;
        var increment = 270 / range;
        this.needle = this.gauge.getById("needle");
        this.needle.animate({transform: ["R", newValue * increment, width/2, height/2 ]}, 1000, "<>");
        this.value = newValue;
    };
    
    
};

