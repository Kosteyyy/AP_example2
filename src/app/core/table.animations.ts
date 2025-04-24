import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";

export const HighlightTrigger = trigger("rowHighlight", [
    state(
        "selected",
        style({ backgroundColor: "lightgreen", fontSize: "20px" })
    ),
    state(
        "notselected",
        style({ backgroundColor: "lightsalmon", fontSize: "12px" })
    ),
    state(
        "*",
        style({
            border: "solid black 2px",
        })
    ),
    state(
        "void",
        style({
            opacity: 0,
        })
    ),
    transition("selected => notselected", animate("1000ms")),
    transition("notselected => selected", animate("400ms")),
    // transition(':enter, * => notselected', animate("800ms")),
    // transition("* => selected", animate("400ms")),
    // transition("void => *", animate("500ms")),
]);
