<div class="table">

| Brand Name  | Display        | Copy      | Accent      | UI        |
| ----------- | -------------- | --------- | ----------- | --------- |
| ACC         | Maven Pro      | Open Sans | Roboto Slab | Open Sans |
| CardioSmart | Maven Pro      | Open Sans | Roboto Slab | Open Sans |
| CVQuality   | Maven Pro      | Lato      | Roboto Slab | Lato      |
| Virtual     | Libre Franklin | Open Sans | Roboto Slab | Open Sans |

</div>

| CSS Style                               | Short Name | has modifier                 | Uses Stepped Value                         |
| --------------------------------------- | ---------- | ---------------------------- | ------------------------------------------ |
| background-color                        | .bg        |                              | <i class="fas fa-check"></i> as a modifier |
| border-color                            | .br        |                              | <i class="fas fa-check"></i> as a modifier |
| border-radius                           | .br        | <i class="fas fa-check"></i> |                                            |
| border-width                            | .br        | <i class="fas fa-check"></i> | <i class="fas fa-check"></i>               |
| color                                   | .c         |                              | <i class="fas fa-check"></i> as a modifier |
| clear                                   | .clear     |                              |                                            |
| display                                 | .          |                              |                                            |
| flex                                    | .flex      |                              |                                            |
| float                                   | .float     |                              |                                            |
| font-size                               | .font      |                              | <i class="fas fa-check"></i>               |
| font-family                             | .font      |                              |                                            |
| font-weight                             | .font      |                              |                                            |
| font-style                              | .font      |                              |                                            |
| height                                  | .h         |                              |                                            |
| justify-content                         | .justify   |                              |                                            |
| margin                                  | .m         | <i class="fas fa-check"></i> | <i class="fas fa-check"></i>               |
| overflow                                | .overflow  |                              |                                            |
| padding                                 | .p         | <i class="fas fa-check"></i> | <i class="fas fa-check"></i>               |
| position                                | .          |                              |                                            |
| <em class="p-l_4 c_primary">top</em>    | .t         |                              | <i class="fas fa-check"></i>               |
| <em class="p-l_4 c_primary">right</em>  | .r         |                              | <i class="fas fa-check"></i>               |
| <em class="p-l_4 c_primary">bottom</em> | .b         |                              | <i class="fas fa-check"></i>               |
| <em class="p-l_4 c_primary">left</em>   | .l         |                              | <i class="fas fa-check"></i>               |
| line-height                             | .lh        |                              | <i class="fas fa-check"></i>               |
| width                                   | .w         |                              |                                            |
| max-width                               | .max-w     |                              |                                            |



| Style        | Short Name | Example                    |
| ------------ | ---------- | -------------------------- |
| top          | -t         | margin-top                 |
| bottom       | -b         | margin-bottom              |
| left         | -l         | margin-left                |
| right        | -r         | margin-right               |
| top-right    | tr         | border-top-right-radius    |
| top-left     | tl         | border-top-left-radius     |
| bottom-right | br         | border-bottom-right-radius |
| bottom-left  | bl         | border-bottom-left-radius  |


| states      | Short Name | CSS      | Currently Used                         |
| ----------- | ---------- | -------- | -------------------------------------- |
| hover       | h:         | :hover   | Yes                                    |
| active      | a:         | :active  | <span class="c_warning">Partial</span> |
| ~~visited~~ | ~~v:~~     | :visited | <span class="c_alert">Not Used</span>  |

| Value Postfix | Font Size | Margin, top, left, right, bottom | Padding              | Line Height | border-width | Color Modifier         |
| ------------- | --------- | -------------------------------- | -------------------- | ----------- | ------------ | ---------------------- |
| n5            | ms(-5)    | -2 \* X<sup>†</sup>              | N/A                  | N/A         | N/A          | mix(color, black, 90%) |
| n4            | ms(-4)    | -1 \* X<sup>†</sup>              | N/A                  | N/A         | N/A          | mix(color, black, 70%) |
| n3            | ms(-3)    | -.5 \* X<sup>†</sup>             | N/A                  | N/A         | N/A          | mix(color, black, 50%) |
| n2            | ms(-2)    | -.25 \* X<sup>†</sup>            | N/A                  | N/A         | N/A          | mix(color, black, 30%) |
| n1            | ms(-1)    | -.1 \* X<sup>†</sup>             | N/A                  | N/A         | N/A          | mix(color, black, 10%) |
| 0             | ms(0)     | 0                                | 0                    | 0           | 0            | color @ 100%           |
| 1             | ms(1)     | .1 \* X<sup>†</sup>              | .1 \* X<sup>†</sup>  | 1           | 1px          | mix(color, white, 10%) |
| 2             | ms(2)     | .25 \* X<sup>†</sup>             | .25 \* X<sup>†</sup> | 1.45        | 3px          | mix(color, white, 30%) |
| 3             | ms(3)     | .5 \* X<sup>†</sup>              | 5 \* X<sup>†</sup>   | 1.65        | 5px          | mix(color, white, 50%) |
| 4             | ms(4)     | 1 \* X<sup>†</sup>               | 1 \* X<sup>†</sup>   | 1.75        | .5rem        | mix(color, white, 70%) |
| 5             | ms(5)     | 2 \* X<sup>†</sup>               | 2 \* X<sup>†</sup>   | 2           | 1rem         | mix(color, white, 90%) |