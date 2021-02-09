<div class='home_nav'><div class="br_1 br_round br_solid br_white-7 p_5 relative shadow_3 m-x_3">
	<div class="absolute t_0 r_0 l_0 b_0 opacity_5 z_0 br_round bg_center bg_cover" style="background-image:url('img/triangletexture/rainbowtriangles.PNG')"></div>
		<h1 class="c_black font_10:lg font_6 font_8:md font_ui lh_1 m-y_4">
			Arches
			<span class="block font_2 m-y_2 font_bold opacity_7">Multi Product, Framework, Brand Style System</span>
		</h1>
		<p class="c_black m-y_3 max-w_65 lh_3 font_1">
			Arches is a central design system for the American College of Cardiology and establishes the DNA standards for multiple products within the ACC portfolio. The Arches Design System achieves its front end flexibility through three layers, each building upon the former: Basic UI Structures, Branding, and Utility Classes. The Basic UI structure brings patterns for commonly used UI patterns found on the web, which are a combination of design and interaction. The branding layer defines the fonts, colors, and logos for a product line within the ACC's Larger Portfolio, establishing the product's  Design DNA. The Utility Classes establish the Design DNA's variances through modifiers that can affect size, color value, font attributes, and structure mechanisms. These layers in concert produce a robust front-end solution giving both designers and developers the power to tackle the college's future needs. 
		</p>
		<p class="c_black m-y_3 max-w_65 lh_3 font_0">
			The arches code base has split up the CSS depending on the need.
			Utility Classes have no defined UI patterns but can be combined to
			make complicated UI elements. The naming convention combines the
			brand with the utility class abbreviation, for example,
			"acc_uc.css." Similar frameworks style sheets with the UI patterns
			combine an abbreviation of the brand and framework, such as
			"acc_boot.css."
		</p>
		<p class="c_black m-y_3 max-w_65 lh_3 font_0">
			There are extending style sheets that define a universal color
			language for our document elements and concepts. These color code
			style sheets cover social, credit colors, scientific pathway, and
			level of effort & confidence. Only include these separated
			stylesheets when the extra decoration is needed to help improve page
			performance. The naming for these files combines "color-code" with
			the defined usage, such as "color-codes_credits.css."
        </p>
</div>
<div class="p_5">

## Arches Overview of Variations and Sub Stylesheets

<iframe class="m_4 br_1 br_shade-3 br_solid" width="800" height="450" src="https://whimsical.com/embed/VG8xNLvXFCwSTBQRSsdwBW"></iframe>

## Utility Classes

Utility classes are a distinct departure from many previous learned CSS theories, but what utility classes allow is an excellent separation of concerns between the HTML and CSS. Utility classes are focused on controlling a single style in CSS. Utility Class Methodology has significant benefits of reducing the expansion of scope in CSS coding while giving greater flexibility in crafting new user interface components. While writing new user interfaces, the Html should use the best semantics standards, but it is no longer a concern to follow HTML patterns tightly coupled to the CSS Code.

### Naming Convention

Arches does have a learning curve, but to reduce the curve the names follow a strict pattern with consistent abreviation. [Read More](https://acc-style.github.io/Arches/boot_acc/section-uc.html)

#### [pseudo state]:[style name]\_[value+unit]-[modifier]:[break point]

An example of wanting the text color of an object when hovered to become the primary the color only when the screen is large would be h:c_primary:lg.

## Definition of Style Short Hand

Strathmore utilizes an abbreviated naming convention for utility classes to save typing for developers and to also reduce overall files size.

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

## Alternate Values

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

#### max-width

| Value Postfix | dimension | Use case            |
| ------------- | --------- | ------------------- |
| 5             | 5 rem     |                     |
| 10            | 10rem     |                     |
| 15            | 15rem     |                     |
| 20            | 20rem     | Small Phone Size    |
| 25            | 25rem     |                     |
| 30            | 30rem     | Short Readable Zone |
| 35            | 35rem     | Short Readable Zone |
| 40            | 40rem     | Short Readable Zone |
| 45            | 45rem     | Readable Zone       |
| 50            | 50rem     | Readable Zone       |
| 55            | 55rem     | Readable Zone       |
| 60            | 60rem     | Readable Zone       |
| 65            | 65rem     | Readable Zone       |
| 70            | 70rem     | Readable Zone       |
| 75            | 75rem     |                     |
| 80            | 80rem     |                     |
| 85            | 85rem     | Max Desktop Range   |
| 90            | 90rem     | Max Desktop Range   |
| 95            | 95rem     | Max Desktop Range   |

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

## Reserved Names

#### Reserved Words and Modifier Descriptors

These words should be used to describe states and generic elements of the UI and should be used instead of some variation or alternate name.

#### Component Name Modifier

Components styling is most are

-   ** -container ** or UI Name with no modifier (Use instead of holder when items are UI based)
-   ** -group ** or UI Name with no modifier (Use instead of list, holder, collection when items or repeatable Content)
-   ** -item ** or UI Name with no modifier (generic child of container or group)
-   ** -separator ** (a visual treatment or break between items within a container or group )

#### States

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
<style>

</style>
