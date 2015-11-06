'use strict';

app
    .service('baseRepository', function () {
        /**
         * Setter for collection property
         *
         * @param collection
         * @returns {*}
         */
        function setCollection (collection) {
            this.collection = collection;

            return this;
        };

        /**
         * Setter for item property
         *
         * @param item
         * @returns {*}
         */
        function setItem (item) {
            this.item = item;

            return this;
        };

        /**
         * Setter for element property
         *
         * @param element
         * @returns {*}
         */
        function setElement (element) {
            this.element = element;

            return this;
        };

        /**
         * Add item to collection
         *
         * @returns {{}}
         */
        function save () {
            this.collection.push(this.item);
            this.element.focus();

            return {};
        };

        /**
         * Remove item from collection
         *
         * @param id
         */
        function remove (id) {
            this.collection.splice(id, 1);
        };

        /**
         * Empty collection, back referencing
         *
         * @returns {collection|*}
         */
        function removeAll () {
            this.collection = [];

            return this.collection;
        };

        this.collection = null;
        this.item = null;
        this.element = null;

        /**
         * Expose
         */
        this.setCollection = setCollection;
        this.setItem = setItem;
        this.setElement = setElement;
        this.save = save;
        this.remove = remove;
        this.removeAll = removeAll;
    })
;