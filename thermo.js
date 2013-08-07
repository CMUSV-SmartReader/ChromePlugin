var ThermoReader = {
	addPageView: function() {
		var baseUrl = "http://thermoreader.com/";
		var pages = ["#/recommendation", "", "#/social", "#/discover"];
		var current = pages[Math.floor((Math.random()*pages.length)) % pages.length];
		$.ajax({
			url: baseUrl + current,
			dataType: "html",
			success: function (){
				console.log("success");
			}
		})
	},
	createList: function(data) {
		console.log("here");
		var template = $($(".template")[0]).clone();
		$("#content-list").empty();
		console.log(data);
		$.each(data,function(id, article) {
			console.log(article.title);
			var item = template.clone();
			var titlePostfix = (article.title.length > 20)?"...":"";
			item.find(".title").text(article.title.substring(0,20) + titlePostfix);
			article.desc = article.desc || "";
			var content = article.desc.replace(/(<([^>]+)>)/ig, ""); 
			item.find(".desc").text(content.substring(0,30));
			if(article.popularity >= 0.5) item.addClass("pop1");
			else if(article.popularity >= 0.3) item.addClass("pop2");
			else if(article.popularity >= 0.2) item.addClass("pop3");
			else if(article.popularity >= 0.1) item.addClass("pop4");
			else item.addClass("pop5");
			item.show();
			$("#content-list").append(item);
		});
	}, 
	getContent: function(callback) {
		$(".template").hide();
		$.ajax({
			url: "http://thermoreader.com/article/all_recommend", 
			type: "GET",
			success: function (data) {
				console.log("test");
				console.log(data);
				data = JSON.parse(data);
				data.sort(function(itemA, itemB){
					var popA = itemA.popularity;
					var popB = itemA.popularity;
					return popB-popA;
				});
				if(callback !== undefined)
					callback(data);
			}
		});

	}
}
