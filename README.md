# webflow dropdown accessibility (Out of USE - webflow also solve this by the Core code)
Accessible is very important issue.

**DEMO**
http://bg-153eaa.webflow.io/dropdown-accessibility

**My code solve this missing features of Webflow dropdowns (Just `Copy-Paste` "before body"):**

#### Keyboard Support
- <kbd>Tab key</kbd> - `Dropdown Toggle` and `Dropdown Links` **tabindex = 0** (Otherwise No way to tab/focus the dropdown)
- Open/Close dropdown by <kbd>enter</kbd>
- If <kbd>Up Arrow</kbd> or <kbd>Down Arrow</kbd> is pressed, the previous or next option is scrolled into view
- <kbd>Esc Button</kbd> Close dropdown
- <kbd>home button</kbd> (Select first dropdown link)
- <kbd>end button</kbd> (Select last dropdown link)


### Aria
- `aria-haspopup` - for the dropdown button
- toggle `aria-expanded` when show/hide dropdown

## "The Problem"
This is "**middle solution**" (custom code) - VS webflow core solution - more lines of code // more complex + Hard to get support (If webflow overtime change navbar structure maybe this code will break + Not all users know JS).

Anyway - for now no other solution :(

### Bugs
Please add her any bug you find. Thanks

### Wishlist related:
https://wishlist.webflow.com/ideas/WEBFLOW-I-862
In my opnion to broad wishlist topic (Its better to solve each component).

Solve all the ideas her:
https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
