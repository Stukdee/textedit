var h = window.innerHeight, w = window.innerWidth;
window.onresize = function () {
if (h != window.innerHeight || w != window.innerWidth) {
    window.close();
    window.location = "about:blank";
    }
}
function Savee(){
    var _global = typeof window === 'object' && window.window === window
        ? window : typeof self === 'object' && self.self === self
            ? self : typeof global === 'object' && global.global === global
                ? global
                : this
    function bom(blob, opts) {
        if (typeof opts === 'undefined') opts = { autoBom: false }
        else if (typeof opts !== 'object') {
            console.warn('Deprecated: Expected third argument to be a object')
            opts = { autoBom: !opts }
        }
        if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
        }
        return blob
    }
    function download(url, name, opts) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.onload = function () {
            saveAs(xhr.response, name, opts)
        }
        xhr.onerror = function () {
            console.error('could not download file')
        }
        xhr.send()
    }
    function corsEnabled(url) {
        var xhr = new XMLHttpRequest()
        // use sync to avoid popup blocker
        xhr.open('HEAD', url, false)
        try {
            xhr.send()
        } catch (e) { }
        return xhr.status >= 200 && xhr.status <= 299
    }
    // `a.click()` doesn't work for all browsers (#465)
    function click(node) {
        try {
            node.dispatchEvent(new MouseEvent('click'))
        } catch (e) {
            var evt = document.createEvent('MouseEvents')
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                20, false, false, false, false, 0, null)
            node.dispatchEvent(evt)
        }
    }
    var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)
    var saveAs = _global.saveAs || (
        (typeof window !== 'object' || window !== _global)
            ? function saveAs() { /* noop */ }
            : ('download' in HTMLAnchorElement.prototype && !isMacOSWebView)
                ? function saveAs(blob, name, opts) {
                    var URL = _global.URL || _global.webkitURL
                    var a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
                    name = name || blob.name || 'download'
                    a.download = name
                    a.rel = 'noopener'
                    if (typeof blob === 'string') {
                        a.href = blob
                        if (a.origin !== location.origin) {
                            corsEnabled(a.href)
                                ? download(blob, name, opts)
                                : click(a, a.target = '_blank')
                        } else {
                            click(a)
                        }
                    } else {
                        a.href = URL.createObjectURL(blob)
                        setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
                        setTimeout(function () { click(a) }, 0)
                    }
                }
                : 'msSaveOrOpenBlob' in navigator
                    ? function saveAs(blob, name, opts) {
                        name = name || blob.name || 'download'
                        if (typeof blob === 'string') {
                            if (corsEnabled(blob)) {
                                download(blob, name, opts)
                            } else {
                                var a = document.createElement('a')
                                a.href = blob
                                a.target = '_blank'
                                setTimeout(function () { click(a) })
                            }
                        } else {
                            navigator.msSaveOrOpenBlob(bom(blob, opts), name)
                        }
                    }
                    : function saveAs(blob, name, opts, popup) {
                        popup = popup || open('', '_blank')
                        if (popup) {
                            popup.document.title =
                                popup.document.body.innerText = 'downloading...'
                        }
                        if (typeof blob === 'string') return download(blob, name, opts)
                        var force = blob.type === 'application/octet-stream'
                        var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
                        var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)
                        if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
                            var reader = new FileReader()
                            reader.onloadend = function () {
                                var url = reader.result
                                url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
                                if (popup) popup.location.href = url
                                else location = url
                                popup = null
                            }
                            reader.readAsDataURL(blob)
                        } else {
                            var URL = _global.URL || _global.webkitURL
                            var url = URL.createObjectURL(blob)
                            if (popup) popup.location = url
                            else location.href = url
                            setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
                        }
                    }
    )
    _global.saveAs = saveAs.saveAs = saveAs
    if (typeof module !== 'undefined') {
        module.exports = saveAs;
    }
    if(document.getElementById('tti').value == ""){
        nemete = "一个没有名字的文档.txt";
    }
    else{
        nemete = document.getElementById('tti').value + ".txt";
    }
    var blob = new Blob([document.getElementById('texte').value], { type: "text/plain;charset=utf-8" });
    saveAs(blob, nemete);
}
function Huancun(){
    open("https://github.com/Stukdee/textedit/");
}
function Runn(){
    var strCode = document.getElementById("texte").value;
    document.getElementById("textareaCoded").innerHTML = strCode;
}
function Xiao(){
    document.getElementById('box').style.width="100%";
    document.getElementById('box').style.height="100%";
    document.getElementById('texte').style.height="100%";
    document.getElementById('texte').style.width="99%";
    document.getElementById("quanping").innerHTML = "□";
    document.getElementById('chacha').style.borderRadius="0px 20px 20px 0px";
    document.getElementById('runn').style.borderRadius = "0px 20px 20px 0px";
    document.getElementById('zuixiaohua').style.borderRadius="20px 0px 0px 20px";
    document.getElementById('savee').style.borderRadius = "20px 0px 0px 20px";
}
function Da(){
    document.getElementById('box').style.width="500px";
    document.getElementById('box').style.height="250px";
    document.getElementById('texte').style.height="220px";
    document.getElementById('texte').style.width="492px";
    document.getElementById("quanping").innerHTML = "■"
    document.getElementById('chacha').style.borderRadius="0px 12px 0px 0px";
    document.getElementById('zuixiaohua').style.borderRadius="0px 0px 0px 12px";
    document.getElementById('savee').style.borderRadius="12px 0px 0px 0px";
    document.getElementById('runn').style.borderRadius="0px 0px 12px 0px";
}
function Closell(){
    document.getElementById('titlee').style.display="none";
    document.getElementById('texte').style.display="none";
    document.getElementById('box').style.width="0px";
    document.getElementById('box').style.height="0px";
    document.getElementById('UI_Button').style.display="none";
    document.getElementById('open').style.display='block';
}
function showkey() {
    if(event.keyCode == 32){
        anjian.innerHTML = '空格';
    }
    else if(event.keyCode == 8){
        anjian.innerHTML = '退格';
    }
    else if(event.keyCode == 20){
        anjian.innerHTML = '大小写切换';
    }
    else if(event.keyCode == 13){
        anjian.innerHTML = '回车';
    }
    else{
        asc = event.keyCode;
    key = String.fromCharCode(asc);
    anjian.innerHTML = key;
    }
}
document.onkeypress = showkey;
function Openw(){
    document.getElementById('zuixiaohua').style.borderRadius="0px 0px 0px 12px";
    document.getElementById('chacha').style.borderRadius="0px 12px 0px 0px";
    document.getElementById('titlee').style.display="block";
    document.getElementById('texte').style.display="block";
    document.getElementById("quanping").innerHTML = "■"
    document.getElementById('savee').style.borderRadius="12px 0px 0px 0px";
    document.getElementById('runn').style.borderRadius="0px 0px 12px 0px";
    document.getElementById('box').style.width="500px";
    document.getElementById('box').style.height="250px";
    document.getElementById('texte').style.height="220px";
    document.getElementById('texte').style.width="492px";
    document.getElementById('UI_Button').style.display = "block";
    document.getElementById('open').style.display='none';
}
