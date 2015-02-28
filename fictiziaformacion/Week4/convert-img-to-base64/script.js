/**
 * convertImgToBase64
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat='image/png']
 * @author HaNdTriX
 * @example
	convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
		console.log('IMAGE:',base64Img);
	})
 */
function convertImgToBase64(url, callback, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
	  	ctx.drawImage(img,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback.call(this, dataURL);
        // Clean up
	  	canvas = null; 
	};
	img.src = url;
}


$('#img2b64').submit(function(event){
    var imageUrl = $(this).find('input[name=url]').val();
    console.log('imageUrl', imageUrl);
    convertImgToBase64(imageUrl, function(base64Img){
        $('.output')
            .find('textarea')
                .val(base64Img)
                .end()
            .find('a')
                .attr('href', base64Img)
                .text(base64Img)
                .end()
            .find('img')
                .attr('src', base64Img);
    });
    
    event.preventDefault();
});
