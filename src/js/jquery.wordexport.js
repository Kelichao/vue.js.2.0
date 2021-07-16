// 插件名称：jQuery Word Export
// $(".main").wordExport("累计年报");
    

if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName) {
            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            const static2 = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            const options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            const markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                const self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            const images = [];
            const img = markup.find('img');
            for (let i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                const w = Math.min(img[i].width, options.maxWidth);
                const h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                const canvas = document.createElement("CANVAS");
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                const context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                const uri = canvas.toDataURL("image/png");
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }

            // Prepare bottom of mhtml file with image data
            let mhtmlBottom = "\n";
            for (let i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            //styles设置为空：WPS无法默认横向，默认分栏暂不支持WPS；office默认横向分栏在styles中无法使用，需在html中设置
            //var styles="@page WordSection1{size:841.9pt 595.3pt;mso-page-orientation:landscape;	margin:90.0pt 72.0pt 90.0pt 72.0pt;	mso-columns: 2 even 21.25pt;} div.WordSection1 {page:WordSection1;}";
			//var styles='/* Font Definitions */ @font-face	{font-family:宋体;	panose-1:2 1 6 0 3 1 1 1 1 1;	mso-font-alt:SimSun;	mso-font-charset:134;	mso-generic-font-family:auto;	mso-font-pitch:variable;	mso-font-signature:3 680460288 22 0 262145 0;}@font-face	{font-family:宋体;	panose-1:2 1 6 0 3 1 1 1 1 1;	mso-font-alt:SimSun;	mso-font-charset:134;	mso-generic-font-family:auto;	mso-font-pitch:variable;	mso-font-signature:3 680460288 22 0 262145 0;}@font-face	{font-family:"\@宋体";	panose-1:2 1 6 0 3 1 1 1 1 1;	mso-font-charset:134;	mso-generic-font-family:auto;	mso-font-pitch:variable;	mso-font-signature:3 680460288 22 0 262145 0;} /* Style Definitions */ p.MsoNormal, li.MsoNormal, div.MsoNormal	{mso-style-unhide:no;	mso-style-qformat:yes;	mso-style-parent:"";	margin:0cm;	margin-bottom:.0001pt;	mso-pagination:widow-orphan;	font-size:12.0pt;	font-family:宋体;	mso-bidi-font-family:宋体;}p	{mso-style-noshow:yes;	mso-style-priority:99;	mso-margin-top-alt:auto;	margin-right:0cm;	mso-margin-bottom-alt:auto;	margin-left:0cm;	mso-pagination:widow-orphan;	font-size:12.0pt;	font-family:宋体;	mso-bidi-font-family:宋体;}.MsoChpDefault	{mso-style-type:export-only;	mso-default-props:yes;	font-size:10.0pt;	mso-ansi-font-size:10.0pt;	mso-bidi-font-size:10.0pt;	mso-ascii-font-family:"Times New Roman";	mso-hansi-font-family:"Times New Roman";	mso-font-kerning:0pt;}@page WordSection1	{size:841.9pt 595.3pt;mso-page-orientation:landscape;	margin:90.0pt 72.0pt 90.0pt 72.0pt;	mso-columns: 2 even 21.25pt;	mso-header-margin: 42.55pt;mso-footer-margin: 49.6pt;mso-paper-source:0;}div.WordSection1	{page:WordSection1;}';
            // @page Section1{ size:595.35pt 841.95pt;mso-page-orientation:luprightness;margin:72.0pt 90.0pt 72.0pt 90.0pt;mso-header-margin:42.55pt;mso-footer-margin:49.6pt;mso-gutter-margin:0.0pt;mso-paper-source:0;padding:24.0pt 24.0pt 24.0pt 24.0pt;layout-grid:16.3pt;} div.Section1{page:Section1;};"

            // const styles = "";
            const styles = "@page rank{size:841.95pt 595.35pt;mso-page-orientation:landscape;margin:90.0pt 72.0pt 90.0pt 72.0pt;mso-header-margin:42.55pt;mso-footer-margin:49.6pt;mso-gutter-margin:0.0pt;mso-paper-source:0;padding:24.0pt 24.0pt 24.0pt 24.0pt;layout-grid:16.3pt;} div.rank{page:rank;}";
            // Aggregate parts of the file together
            const fileContent = static2.mhtml.top.replace("_html_", static2.mhtml.head.replace("_styles_", styles) + static2.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

            // Create a Blob with the file contents
            const blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc"); // 必须要用doc,如果是docx则微软word无法打开
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
}
