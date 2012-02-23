enyo.kind({
	name: "Pullout",
	kind: "Slideable",
	events: {
		onDropPin: "",
		onShowTraffic: "",
		onMapTypeSelect: ""
	},
	components: [
		{classes: "pullout-shadow"},
		{classes: "pullout-grapbutton"},
		{name: "info", classes: "enyo-fit", components: [
			{kind: "onyx.Groupbox", classes: "settings", components: [
				{kind: "onyx.GroupboxHeader", content: "General"},
				{kind: "LabeledItem", label: "Drop Pin", icon: "images/icon-dropPin.png", defaultKind: "onyx.ToggleButton", onChange: "dropPinChange"},
				{kind: "LabeledItem", label: "Show Traffic", icon: "images/icon-traffic.png", defaultKind: "onyx.ToggleButton", onChange: "showTrafficChange"}
			]},
			{name: "mapType", kind: "onyx.Groupbox", classes: "settings", components: [
				{kind: "onyx.GroupboxHeader", content: "Map Type"},
				{kind: "LabeledItem", label: "Road", mapType: "road", icon: "images/map-type-road.png", value: true, onChange: "mapTypeChange"},
				{kind: "LabeledItem", label: "Satellite", mapType: "aerial", icon: "images/map-type-satellite.png", onChange: "mapTypeChange"},
				{kind: "LabeledItem", label: "Bird's Eye", mapType: "birdseye", icon: "images/map-type-bird-eye.png", onChange: "mapTypeChange"}
			]}
		]},
		{name: "bookmark", showing: false, classes: "enyo-fit", components: [
			{kind: "onyx.RadioGroup", classes: "bookmark-header", components: [
				{content: "Saved", active: true},
				{content: "Recents"}
			]},
			{kind: "Scroller", classes: "enyo-fit", style: "top: 70px;", components: [
				{kind: "BookmarkList"}
			]}
		]}
	],
	toggle: function(inPanelName) {
		var t = this.$[inPanelName];
		if (t.showing && this.isAtMin()) {
			this.animateToMax();
		} else {
			this.animateToMin();
			this.$.info.hide();
			this.$.bookmark.hide();
			this.$[inPanelName].show();
		}
	},
	dropPinChange: function(inSender) {
		this.doDropPin({value: inSender.getValue()});
	},
	showTrafficChange: function(inSender) {
		this.doShowTraffic({value: inSender.getValue()});
	},
	mapTypeChange: function(inSender) {
		if (!inSender.getValue()) {
			inSender.setValue(true);
			return;
		}
		enyo.forEach(this.$.mapType.children, function(inC) {
			if (inSender !== inC) {
				enyo.call(inC, "setValue", false);
			}
		});
		this.doMapTypeSelect({mapType: inSender.mapType});
	}
})