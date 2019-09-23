<div class='noframework_nav'><div class="br_1 br_round br_solid br_white-7 p_5 relative shadow_3 m-x_3">
	<div class="absolute t_0 r_0 l_0 b_0 opacity_7 z_0 br_round bg_center bg_cover" style="background-image:url('../img/triangletexture/pinktriangles.PNG')"></div>
		<div class="c_black font_11:lg font_6 font_8:md font_ui lh_1 m-y_4">Utlity Classes Only
			<span class="block font_1 m-y_2 font_bold opacity_7">Add utlitltiy functionality to current projects.</span>
		</div>
	<p class="c_black m-y_3 max-w_5 lh_3">Arches is a central design system is created to be standalone but constraints of budget and time sometimes doesn't allow for the that type of project implementation. Artches Utitlity Classes are made to stand ontop of another design and impart and ACC brand utilty class functionality.</p>
</div>
<div class="p_5">

## Utility Class Overview

![Mind Map of Arches](../UCOverview.png)

</div>

## Utility Classes

Utility classes are a distinct departure from many previous learned CSS theories, but what utility classes allow for is an excellent separation of concerns between the HTML and CSS. The singular focus for utility classes is a single class controls a single style in CSS. Utility Class has significant benefits of reducing scope expansion in the CSS and also gives greater flexibility of crafting user interface components that are currently undefined. Html should continually be written using the best standards for semantics, but it is no longer a concern to follow a components design pattern because it is applicable at the HTML level.

### Naming Convention

Strathmore does have a learning curve, but to reduce the curve the names follow a strict pattern. State of the elements which then effects a single style at a defined value which only effects at a specific breakpoint. <a href="./Strathmore/#!/section/100"> read more</a>

#### [pseudo state]:[style name]\_[value+unit]-[modifier]:[break point]

An example of wanting the text color of an object when hovered to become the primary the color only when the screen is large would be h:c_primary:lg.

### Definition of Style Short Hand

Strathmore utilizes an abbreviated naming convention for utility classes to save typing for developers and to also reduce overall files size.

</div>

| Style                      | Short Name  | CSS                          | Long Nmae                     |
| -------------------------- | ----------- | ---------------------------- | ----------------------------- |
| margin                     | '.m'        | 'margin'                     | '.margin'                     |
| margin-top                 | '.m-t'      | 'margin-top'                 | '.margin-top'                 |
| margin-bottom              | '.m-b'      | 'margin-bottom'              | '.margin-bottom'              |
| margin-left                | '.m-l'      | 'margin-left'                | '.margin-left'                |
| margin-right               | '.m-r'      | 'margin-right'               | '.margin-right'               |
| overflow                   | '.overflow' | 'overflow'                   | '.overflow'                   |
| padding                    | '.p'        | 'padding'                    | '.padding'                    |
| padding-top                | '.p-t'      | 'padding-top'                | '.padding-top'                |
| padding-bottom             | '.p-b'      | 'padding-bottom'             | '.padding-bottom'             |
| padding-left               | '.p-l'      | 'padding-left'               | '.padding-left'               |
| padding-right              | '.p-r'      | 'padding-right'              | '.padding-right'              |
| line-height                | '.lh'       | 'line-height'                | '.line-height'                |
| font-size                  | '.font'     | 'font-size'                  | '.font-size'                  |
| font-family                | '.font'     | 'font-family'                | '.font-family'                |
| font-weight                | '.font'     | 'font-weight'                | '.font-weight'                |
| font-style                 | '.font'     | 'font-style'                 | '.font-style'                 |
| color                      | '.c'        | 'color'                      | '.color'                      |
| background-color           | '.bg'       | 'background-color'           | '.back'                       |
| border-color               | '.br'       | 'border-color'               | '.border'                     |
| border-radius              | '.br'       | 'border-radius'              | '.border-radius'              |
| border-top-right-radius    | '.br-tr'    | 'border-top-right-radius'    | '.border-top-right-radius'    |
| border-top-left-radius     | '.br-tl'    | 'border-top-left-radius'     | '.border-top-left-radius'     |
| border-bottom-right-radius | '.br-br'    | 'border-bottom-right-radius' | '.border-bottom-right-radius' |
| border-bottom-left-radius  | '.br-bl'    | 'border-bottom-left-radius'  | '.border-bottom-left-radius'  |
| border-width               | '.br'       | 'border-width'               | '.border-width'               |
| border-top-width           | '.br-t'     | 'border-top-width'           | '.border-top-width'           |
| border-right-width         | '.br-r'     | 'border-right-width'         | '.border-right-width'         |
| border-left-width          | '.br-l'     | 'border-left-width'          | '.border-left-width'          |
| border-bottom-width        | '.br-b'     | 'border-bottom-width'        | '.border-bottom-width'        |
| width                      | '.w'        | 'width'                      | '.width'                      |
| display                    | '.d'        | 'display'                    | '.display'                    |
| max-width                  | '.max-w'    | 'max-width'                  | '.max-width'                  |

### pseudo states

| states      | Short Name | CSS        | Long Name | Currently Used                  |
| ----------- | ---------- | ---------- | --------- | ------------------------------- |
| hover       | 'h:'       | ':hover'   | 'hover'   | Yes                             |
| ~~active~~  | ~~'a:'~~   | ':active'  | 'active'  | <span class="c_alert">No</span> |
| ~~visited~~ | ~~'v:'~~   | ':visited' | 'hover'   | <span class="c_alert">No</span> |

### Values

| Value Postfix | Font Size | Margin                | Padding              | Line Height | border-width | Color                  |
| ------------- | --------- | --------------------- | -------------------- | ----------- | ------------ | ---------------------- |
| n5            | ms(-5)    | -2 \* X<sup>†</sup>   | Not Used             | Not Used    | Not Used     | mix(color, black, 90%) |
| n4            | ms(-4)    | -1 \* X<sup>†</sup>   | Not Used             | Not Used    | Not Used     | mix(color, black, 70%) |
| n3            | ms(-3)    | -.5 \* X<sup>†</sup>  | Not Used             | Not Used    | Not Used     | mix(color, black, 50%) |
| n2            | ms(-2)    | -.25 \* X<sup>†</sup> | Not Used             | Not Used    | Not Used     | mix(color, black, 30%) |
| n1            | ms(-1)    | -.1 \* X<sup>†</sup>  | Not Used             | Not Used    | Not Used     | mix(color, black, 10%) |
| 0             | ms(0)     | 0                     | 0                    | 0           | 0            | color @ 100%           |
| 1             | ms(1)     | .1 \* X<sup>†</sup>   | .1 \* X<sup>†</sup>  | 1           | 1px          | mix(color, white, 10%) |
| 2             | ms(2)     | .25 \* X<sup>†</sup>  | .25 \* X<sup>†</sup> | 1.45        | 3px          | mix(color, white, 30%) |
| 3             | ms(3)     | .5 \* X<sup>†</sup>   | 5 \* X<sup>†</sup>   | 1.65        | 5px          | mix(color, white, 50%) |
| 4             | ms(4)     | 1 \* X<sup>†</sup>    | 1 \* X<sup>†</sup>   | 1.75        | .5rem        | mix(color, white, 70%) |
| 5             | ms(5)     | 2 \* X<sup>†</sup>    | 2 \* X<sup>†</sup>   | 2           | 1rem         | mix(color, white, 90%) |

<sup>†</sup> x = global spacing 1 rem

### Break Points

| break point | Short Name | css             | dimension | Currently Used                  |
| ----------- | ---------- | --------------- | --------- | ------------------------------- |
| all sizes   | ''         | min-width: 0em  | 0px       | default                         |
| ~~small~~   | ':sm'      | min-width: 30em | 480px     | <span class="c_alert">No</span> |
| medium      | ':md'      | min-width: 40em | 640px     | Yes                             |
| large       | ':lg'      | min-width: 40em | 1024px    | Yes                             |

### Alternate Values

#### Border Radius

| Value Postfix | Border Radius Values |
| ------------- | -------------------- |
| square        | 0                    |
| radius        | 5px or Global Radius |
| round         | 25px                 |
| circle        | 100%                 |

#### Border Style

| Value Postfix | Border Style Values |
| ------------- | ------------------- |
| none          | none                |
| dashed        | dashed              |
| solid         | solid               |

#### Display

| Value Postfix | Display      |
| ------------- | ------------ |
| none          | none         |
| block         | block        |
| inline        | inline       |
| inline-block  | inline-block |
| flex          | flex         |

#### Overflow

| Value Postfix | Overflow |
| ------------- | -------- |
| auto          | auto     |
| clip          | clip     |
| scroll        | scroll   |
| hidden        | hidden   |
| ellipsis      | ellipsis |
| visible       | visible  |
| unset         | unset    |

<div class="mw-readable m-r_5">

## Reserved Names

### Reserved Words and Modifier Descriptors

These words should be used to describe states and generic elements of the UI and should be used instead of some variation or alternate name.

### Component Name Modifier

Components styling is most are

-   ** -container ** or UI Name with no modifier (Use instead of holder when items are UI based)
-   ** -group ** or UI Name with no modifier (Use instead of list, holder, collection when items or repeatable Content)
-   ** -item ** or UI Name with no modifier (generic child of container or group)
-   ** -separator ** (a visual treatment or break between items within a container or group )

### States

-   show
-   hide
-   is-active
-   is-complete
-   is-disabled
-   is-current
-   is-selected
-   focus
-   success
-   hover
-   warning
-   alert (Depreciate the use of ‘error’ for the native descriptor from foundation)
-   primary
-   secondary
-   reverse

## Colors

-   Scrub Colors
    -   -ACC Blue
    -   -primary teal
    -   -blue
    -   -purple
    -   -magenta
-   State Colors
    -   -success, -green
    -   -warning, -orange
    -   -alert, -red
    -   -primary, -productColor
    -   -secondary
    -   -highlight
-   Black
-   White
-   Black and White have transparencies
    -   -10 alpha,
    -   -20 alpha,
    -   -30 alpha,
    -   -40 alpha,
    -   -50 alpha,
    -   -60 alpha,
    -   -70 alpha,
    -   -80 alpha,
    -   -90 alpha

</div>
</div>
