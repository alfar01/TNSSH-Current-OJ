window.onload = function(){
	var refreshed_content = Array('!content');
	bda.loadText = '<span id="loading">Loading content, please wait ...</span>';
	bda.calculateText = '<span id="loading">Preloading images, parsing content ...</span>';
	bda.errorText = '<h1>The page could not be loaded</h1><p>If you keep getting this the server can be down or somethings wrong with your connection.';
	bda.imagesNotLoadedText = '<span id="loading">Some images could not be loaded.<br/>The page will display without these images.</span>',
	bda.denyFormRules.push('action.contains("login.php")'); 
	// debug mode
	//bda.debugMode = 'list';
	bda.start(refreshed_content);
	
}