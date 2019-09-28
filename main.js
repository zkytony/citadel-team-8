// author: Kaiyu Zheng

function copyright(startyr, elm, useDesign=true) {
    design = "";
    if (useDesign) {
	design = "Designed by us "
    }
    elm.html("<small> " + design
	     + "&copy " + startyr + "-" + (new Date()).getFullYear()
	     + " </small>");
}

function showContent(ctntelm, btnelm) {
    var textKept = btnelm.html().split(" ").slice(1).join(" "); // Must be "show"or"hide" + "{other text}"
    ctntelm.removeClass("hidden");
    btnelm.html("hide " + textKept);
}

function hideContent(ctntelm, btnelm) {
    var textKept = btnelm.html().split(" ").slice(1).join(" "); // Must be "show"or"hide" + "{other text}"
    ctntelm.addClass("hidden");
    btnelm.html("show " + textKept);
}

function handleContentExpansion(btnclicked, btncls, ctntcls) {
    var content = null;
    if ($(btnclicked)[0].hasAttribute('data-target')) {
	content = $("#" + $(btnclicked).attr('data-target'));
    } else {
	var content = $(btnclicked).parent().find(ctntcls);
    }
    if (content.length == 0) {
	return false;
    }

    if (content.hasClass("hidden")) {
	// First, check if any other video in the data-group is shown. If so,
	// hide it.
	if ($(btnclicked)[0].hasAttribute('data-group')) {
	    var group = $(btnclicked).attr('data-group');
	    $(btncls + "[data-group=" + group + "]").each(function(){
		var target = $(this).attr('data-target');
		console.log(target)
		if (!$("#"+target).hasClass("hidden")) {
		    // It is showing. Just hide it.
		    hideContent($("#"+target), $(this));
		}
	    });
	}
	showContent(content, $(btnclicked));
    } else {
	hideContent(content, $(btnclicked));
    }
    return true;
}

$(document).ready(function(){
    // If clicked show video, show the video in this section.
    $(document).on("click", ".show-content-btn", function(e) {
	if (!handleContentExpansion(this, ".show-content-btn", ".embed-video")) {
	    handleContentExpansion(this, ".show-content-btn", ".further-info");
	}
    });

    // If clicked on an in-link, highlight the part that is linked.
    // Also, scropp up slightly fore better viewing experience.
    

    copyright(2016, $("#copyright"));
})
