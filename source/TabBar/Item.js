﻿/**

enyo.TabBar.Item is a special button for TabBar. This widget is
designed to be used only within TabBar.

*/

enyo.kind (
	{
		name: 'onyx.TabBar.Item',
		classes: "onyx-tab-item",
		events: {
			onTabActivated: ''
		},
		components: [
			{
				kind: "Button", // no need of onyx.RadioButton
				name: 'button' ,
				onActivate: 'relayActivate'
			},
			{
				classes: 'onyx-tab-item-dissolve'
			}
		],
		debug: false,

		create: function() {
			this.inherited(arguments);
			this.$.button.setContent(this.content);
			// set up delegation
			this.setActive = enyo.bind(this.$.button, this.$.button.setActive);
		},
		relayActivate: function(inSender, inEvent) {
			// not called when a selected tab is tapped again
			if (this.$.button.hasNode()) {
				if (inEvent.originator.active) {
					var i = this.indexInContainer();
					this.debug && this.log("relayActivate called index " + i , inEvent ) ;
					this.doTabActivated(
						{
							index: i,
							caption: this.content,
							data:    this.userData,
							userId:  this.userId
						}
					);
				}
			}
			// do not return true ;
			// activate event must be propagated to my RadioGroup owner
		}
	}
);
