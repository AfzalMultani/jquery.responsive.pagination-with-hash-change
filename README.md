# beta! jQuery Plugin Responsive Pagination with hash change  

Adds Pagination with hash change

## Demo beta

[Demo jquery-plugins: beta jquery.responsive.pagination-with-hash-change/](http://spielwiese.datenschubse.de/jquery-plugins/jquery.responsive.pagination-with-hash-change/)

## Usage

### HTML

```html


<button class="prev">prev</button>
<button class="next">next</button>
<span class="counter"></span>

<div id="paging-nav"></div>
<ul id="gallery" class="clearfix">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>

  <li>40</li>
</ul> 
```
### jQuery

Use the plugin as follows:

```js
<script src="js/libs/jquery.min.js"></script>
<script src="js/jquery.responsive.pagination-with-hash-change.js"></script>
<script>
  $(document).ready(function() {
   $('#gallery').ResponsivePagination({
      nextSelector: '.next',
      prevSelector: '.prev',
      counterSelector: '.counter',
      pagingSelector: '.paging-nav',
      itemsPerPage: 5,
      initialPage: 1,
      showPageNav: true,
      showPageNumber: true,
      textCounter: 'Page: ' 
    });
  });
</script>
```

### HTML/CSS

The generated HTML source in ``` <div id="paging-nav"> </div> ```:

```html
<ul>
	<li class="active"><a href="#1">1</a></li>
	<li><a href="#2">2</a></li>
	<li><a href="#3">3</a></li>
	<li><a href="#3">3</a></li>
  <li><a href="#4">4</a></li>
  <li><a href="#5">5</a></li>

	<li><a href="#40">40</a></li>
</ul>

```

## Notes

* beta version testing is ongoing !!!
* Requires jQuery 1.11+. 
* # hashes of a link are used
* tested in IE 10, IE 11, Firefox, Chrome


## License

This plugin is dual licensed under the MIT and GPL licenses.

