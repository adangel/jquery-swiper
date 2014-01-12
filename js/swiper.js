$.widget("custom.swiper", {
    // Default options
    options: {
        current: 0
    },

    _create : function() {
        var container = $("<div></div>");
        $(this.element).before(container);
        container.append(this.element);
        container.addClass("custom-swiper");
        this.currentContainer = $("<div></div>");
        container.append(this.currentContainer);

        var slides = $("li", this.element);
        this.options.max = slides.length - 1;

        // setup the initial state
        var h = 0;
        slides.each(function(index, el) {
            if ($(el).height() > h) {
                h = $(el).height();
            }
            $(el).hide();
        });
        if (h > 0) {
            $(this.element).height(h);
        }
        for (var i = 0; i < slides.length; i++) {
            this.currentContainer.append("<span> o </span>");
        };
        $(slides[this.options.current]).show();
        this._refresh(this.options.current, this.options.current);

        // event handlers
        $(this.element).on("swipeleft", { context: this }, this._nextHandler);
        $(this.element).on("swiperight", { context: this }, this._previousHandler);
        this.currentContainer.on("click", "span", { context: this }, this._currentHandler);
    },

    _refresh: function(oldIndex, newIndex) {
        var buttons = $("span", this.currentContainer);
        $(buttons[oldIndex]).text(" o ").removeClass("custom-swiper-selected");
        $(buttons[newIndex]).text(" x ").addClass("custom-swiper-selected");
    },

    _currentClick: function(element) {
        var buttons = $("span", this.currentContainer);
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] === element) {
                this._showSlide(i);
                break;
            }
        }
    },
    _currentHandler: function(event) {
        event.data.context._currentClick(this);
    },

    _showSlide: function( index ) {
        var direction1 = "left", direction2 = "right";
        if (this.options.current > index) {
            direction1 = "right";
            direction2 = "left";
        }
        var slides = $("li", this.element);
        this._refresh(this.options.current, index);
        $(slides[this.options.current]).toggle( "slide", { "direction": direction1 }, 1000 );
        $(slides[index]).toggle( "slide", { "direction": direction2 }, 1000 );
        this.options.current = index;
    },

    _previousHandler: function(event) {
        event.data.context._previous();
    },
    _previous: function() {
        if (this.options.current > 0) {
            this._showSlide(this.options.current - 1);
        }
    },

    _nextHandler: function(event) {
        event.data.context._next();
    },
    _next: function() {
        if (this.options.current < this.options.max) {
            this._showSlide(this.options.current + 1);
        }
    }
});