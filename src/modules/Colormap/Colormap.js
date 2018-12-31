/*
 * Accepts a value from 0-255 and returns the new color-mapped pixel 
 * from a lookup table, which can be specified as an array of [begin, end] 
 * gradients, where begin and end are represented as [r, g, b] colors. In 
 * combination, a lookup table which maps values from 0 - 255 smoothly from black to white looks like:
 * [
 *   [0, [0, 0, 0], [255, 255, 255]],
 *   [1, [255, 255, 255], [255, 255, 255]]
 * ]
 * 
 * Adapted from bgamari's work in Infragram: https://github.com/p-v-o-s/infragram-js/commit/346c97576a07b71a55671d17e0153b7df74e803b
 */

module.exports = function Colormap(value, options) {
  options.colormap = options.colormap || colormaps.default;
  // if a lookup table is provided as an array:
  if(typeof(options.colormap) == "object")
    colormapFunction = colormap(options.colormap);
  // if a stored colormap is named with a string like "fastie":
  else if(colormaps.hasOwnProperty(options.colormap))
    colormapFunction = colormaps[options.colormap];
  else colormapFunction = colormaps.default;
  return colormapFunction(value / 255.00);
}

function colormap(segments) {
  return function(x) {
    var i, result, x0, x1, xstart, y0, y1, _i, _j, _len, _ref, _ref1, _ref2, _ref3;
    _ref = [0, 0], y0 = _ref[0], y1 = _ref[1];
    _ref1 = [segments[0][0], 1], x0 = _ref1[0], x1 = _ref1[1];
    if (x < x0) {
      return y0;
    }
    for (i = _i = 0, _len = segments.length; _i < _len; i = ++_i) {
      _ref2 = segments[i], xstart = _ref2[0], y0 = _ref2[1], y1 = _ref2[2];
      x0 = xstart;
      if (i === segments.length - 1) {
        x1 = 1;
        break;
      }
      x1 = segments[i + 1][0];
      if ((xstart <= x && x < x1)) {
        break;
      }
    }
    result = [];
    for (i = _j = 0, _ref3 = y0.length; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; i = 0 <= _ref3 ? ++_j : --_j) {
      result[i] = (x - x0) / (x1 - x0) * (y1[i] - y0[i]) + y0[i];
    }
    return result;
  };
};

var colormaps = {
  greyscale: colormap([
               [0,     [0,   0,   0],   [220, 20, 60] ],
               [1,     [255, 255, 255], [255, 255, 255] ]
             ]),

 bluwhtgrngis:   colormap([
               [0,     	[6,23,86],    [6,25, 84]    ],
               [0.0625, [6,25,84],    [6,25, 84]    ],//1
               [0.125,  [6,25,84],    [6,25, 84]    ],//2
               [0.1875, [6,25,84],    [6,25, 84]    ],
               [0.25,   [6,25,84],    [6,25,84]     ],
               [0.3125, [6,25,84],    [9,24, 84]    ],//5
               [0.3438, [9,24, 84],   [119,120,162] ],//5
               [0.375,  [119,129,162],[249,250,251] ], //6
               [0.406,  [249,250,251],[255,255,255] ], //6.5
               [0.4375, [255,255,255],[255,255,255] ], //7 white
               [0.50,   [255,255,255],[214,205,191] ],//8
               [0.52,   [214,205,191],[178,175,96]  ],//8.2
               [0.5625, [178,175,96], [151,176,53]  ],//9
               [0.593,  [151,176,53], [146,188,12]  ],//9.5
               [0.625,  [146,188,12], [96,161,1]    ], //10
               [0.6875, [96,161,1],   [30,127,3]    ],//11
               [0.75,   [30,127,3],   [0,99,1]      ],//12
               [0.8125, [0,99,1],     [0,74,1]      ],//13
               [0.875,  [0,74,1],     [0,52, 0]     ],//14
               [0.9375, [0,52, 0],    [0,34,0]      ], //15
               [0.968,  [0,34,0],     [68,70,67]    ] //16
              ]),


  brntogrn:   colormap([
               [0,      [110,12,3],   [118,6,1]      ],
               [0.0625, [118,6,1],    [141,19,6]     ],
               [0.125,  [141,19,6],   [165,35,13]    ],
               [0.1875, [165,35,13],  [177,59,25]    ],
               [0.2188, [177,59,25],  [192,91,36]    ],
               [0.25,   [192,91,36],  [214, 145, 76] ],
               [0.3125, [214,145,76], [230,183,134]  ],
               [0.375,  [230,183,134],[243, 224, 194]],   
               [0.4375, [243,224,194],[250,252,229]  ],
               [0.50,   [250,252,229],[217,235,185]  ],
               [0.5625, [217,235,185],[184,218,143]  ],
               [0.625,  [184,218,143],[141,202,89]   ],
               [0.6875, [141,202,89], [80,176,61]    ],
               [0.75,   [80,176,61],  [0, 147, 32]   ],
               [0.8125, [0,147,32],   [1, 122, 22]   ],
               [0.875,  [1,122,22],   [0, 114, 19]   ],
               [0.90,   [0,114,19],   [0,105,18]     ],
               [0.9375, [0,105,18],   [7,70,14]      ] 

             ]),


  blutoredjet:     colormap([
               [0,       [0,0,140],    [1,1,186]    ],
               [0.0625,  [1,1,186],    [0,1,248]    ],
               [0.125,   [0,1,248],    [0,70,254]   ],
               [0.1875,  [0,70,254],   [0,130,255]  ],
               [0.25,    [0,130,255],  [2,160,255]  ],
	       [0.2813,  [2,160,255],  [0,187,255]  ],	//inset
               [0.3125,  [0,187,255],  [6,250,255]  ],
 //            [0.348,   [0,218,255],  [8,252,251]  ],//inset
               [0.375,   [8,252,251],  [27,254,228] ], 
               [0.406,   [27,254,228], [70,255,187] ], //insert
               [0.4375,  [70,255,187], [104,254,151]],
               [0.47, 	 [104,254,151],[132,255,19] ],//insert
               [0.50,    [132,255,19], [195,255,60] ],
               [0.5625,  [195,255,60], [231,254,25] ],
               [0.5976,  [231,254,25], [253,246,1]  ],//insert
               [0.625,   [253,246,1],  [252,210,1]  ], //yellow
               [0.657,   [252,210,1],  [255,183,0]  ],//insert
               [0.6875,  [255,183,0],  [255,125,2]  ],
               [0.75,    [255,125,2],  [255,65, 1]  ],
               [0.8125,  [255,65, 1],  [247, 1, 1]  ],
               [0.875,   [247,1,1],    [200, 1,  3] ],
               [0.9375,  [200,1,3],    [122, 3,  2] ] 

             ]),


  colors16:   colormap([
               [0,      [0,0,0],       [0,0,0]       ],
               [0.0625, [3,1,172],     [3,1,172]     ],
               [0.125,  [3,1,222],     [3,1, 222]    ],
               [0.1875, [0,111,255],   [0,111,255]   ],
               [0.25,   [3,172,255],   [3,172,255]   ],
               [0.3125, [1,226,255],   [1,226,255]   ],
               [0.375,  [2,255,0],     [2,255,0]     ],   
               [0.4375, [198,254,0],   [190,254,0]   ],
               [0.50,   [252,255,0],   [252,255,0]   ],
               [0.5625, [255,223,3],   [255,223,3]   ],
               [0.625,  [255,143,3],   [255,143,3]   ],
               [0.6875, [255,95,3],    [255,95,3]    ],
               [0.75,   [242,0,1],     [242,0,1]     ],
               [0.8125, [245,0,170],   [245,0,170]   ],
               [0.875,  [223,180,225], [223,180,225] ],
               [0.9375, [255,255,255], [255,255, 255]] 

             ]),

   default:      colormap([
               [0,       [45,1,121],     [25,1,137]    ],
               [0.125,   [25,1,137],     [0,6,156]     ],
               [0.1875,  [0,6,156],      [7,41,172]    ],
               [0.25,    [7,41,172],     [22,84,187]   ],
               [0.3125,  [22,84,187],    [25,125,194]  ],
               [0.375,   [25,125,194],   [26,177,197]  ],   
               [0.4375,  [26,177,197],   [23,199,193]  ],
               [0.47,    [23,199,193],   [25, 200,170] ],
               [0.50,    [25, 200,170],  [21,209,27]   ],
               [0.5625,  [21,209,27],    [108,215,18]  ],
               [0.625,   [108,215,18],   [166,218,19]  ],
               [0.6875,  [166,218,19],   [206,221,20]  ],
               [0.75,    [206,221,20],   [222,213,19 ] ],
               [0.7813,  [222,213,19],   [222, 191, 19]],
               [0.8125,  [222, 191, 19], [227,133,17]  ],
               [0.875,   [227,133,17],   [231,83,16]   ],
               [0.9375,  [231,83,16],    [220,61,48]   ] 

             ]),


  fastie:    colormap([
               [0,     [255, 255, 255], [0,   0,   0]   ],
               [0.167, [0,   0,   0],   [255, 255, 255] ],
               [0.33,  [255, 255, 255],   [0,   0,   0] ],
               [0.5,   [0,   0,   0],   [140, 140, 255] ],
               [0.55,  [140, 140, 255], [0,   255, 0]   ],
               [0.63,  [0,   255, 0],   [255, 255, 0]   ],
               [0.75,  [255, 255, 0],   [255, 0,   0]   ],
               [0.95,  [255, 0,   0],   [255, 0,   255] ]
             ]),


  stretched: colormap([
               [0,     [0,   0,   255], [0,   0,   255] ],
               [0.1,   [0,   0,   255], [38,  195, 195] ],
               [0.5,   [0,   150, 0],   [255, 255, 0]   ],
               [0.7,   [255, 255, 0],   [255, 50,  50]  ],
               [0.9,   [255, 50,  50],  [255, 50,  50]  ]
             ])
 
}
