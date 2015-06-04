/* Staircase | © Zeta Interactive 2013 - 2015 */

;(function()
{
	// Save the version number for reference
	window.$staircase = '5.0.1';

	// Some helpful polyfills (that won't interfere with any other scripts)
	String.prototype.trim = function(a){var b=this,c,l=0,i=0;b+='';if(!a){c=' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'}else{a+='';c=a.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1')}l=b.length;for(i=0;i<l;i++){if(c.indexOf(b.charAt(i))===-1){b=b.substring(i);break}}l=b.length;for(i=l-1;i>=0;i--){if(c.indexOf(b.charAt(i))===-1){b=b.substring(0,i+1);break}}return c.indexOf(b.charAt(0))===-1?b:''};
	String.prototype.hash = function(c){var a='',b='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>!:;,.$';c=c?c:8;for(var i=0;i<c;i++)a+=b.charAt(Math.floor(Math.random()*b.length));return a};
	Number.prototype.toDate = function date(k){var d,a,h="Sun Mon Tues Wednes Thurs Fri Satur January February March April May June July August September October November December".split(" "),f=/\\?(.?)/gi,g=function(b,c){return a[b]?a[b]():c},e=function(b,a){for(b=String(b);b.length<a;)b="0"+b;return b};a={d:function(){return e(a.j(),2)},D:function(){return a.l().slice(0,3)},j:function(){return d.getDate()},l:function(){return h[a.w()]+"day"},N:function(){return a.w()||7},S:function(){var b=a.j(),c=b%10;3>=c&&1==parseInt(b%100/10,10)&&(c=0);return["st","nd","rd"][c-1]||"th"},w:function(){return d.getDay()},z:function(){var b=new Date(a.Y(),a.n()-1,a.j()),c=new Date(a.Y(),0,1);return Math.round((b-c)/864E5)},W:function(){var b=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),c=new Date(b.getFullYear(),0,4);return e(1+Math.round((b-c)/864E5/7),2)},F:function(){return h[6+a.n()]},m:function(){return e(a.n(),2)},M:function(){return a.F().slice(0,3)},n:function(){return d.getMonth()+1},t:function(){return(new Date(a.Y(),a.n(),0)).getDate()},L:function(){var b=a.Y();return 0===b%4&0!==b%100|0===b%400},o:function(){var b=a.n(),c=a.W();return a.Y()+(12===b&&9>c?1:1===b&&9<c?-1:0)},Y:function(){return d.getFullYear()},y:function(){return a.Y().toString().slice(-2)},a:function(){return 11<d.getHours()?"pm":"am"},A:function(){return a.a().toUpperCase()},B:function(){var a=3600*d.getUTCHours(),c=60*d.getUTCMinutes(),f=d.getUTCSeconds();return e(Math.floor((a+c+f+3600)/86.4)%1E3,3)},g:function(){return a.G()%12||12},G:function(){return d.getHours()},h:function(){return e(a.g(),2)},H:function(){return e(a.G(),2)},i:function(){return e(d.getMinutes(),2)},s:function(){return e(d.getSeconds(),2)},u:function(){return e(1E3*d.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)";},I:function(){var b=new Date(a.Y(),0),c=Date.UTC(a.Y(),0),d=new Date(a.Y(),6),e=Date.UTC(a.Y(),6);return b-c!==d-e?1:0},O:function(){var a=d.getTimezoneOffset(),c=Math.abs(a);return(0<a?"-":"+")+e(100*Math.floor(c/60)+c%60,4)},P:function(){var b=a.O();return b.substr(0,3)+":"+b.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-d.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(f,g)},r:function(){return"D, d M Y H:i:s O".replace(f,g)},U:function(){return d/1E3|0}};return function(a,c){d=void 0===c?new Date:c instanceof Date?new Date(c):new Date(1E3*c);return a.replace(f,g)}(k,this)};

	try
	{
		// Supply the window with an array of parameters (?param1=value&param2=value)
		window.location.param = function(n,u){if(!u)var u=window.location.search;var a=RegExp('[?&](?:amp;)?'+(n.replace(/(\[|\]|\{|\}|\?|\/|\\|\||\(|\))/g,'\\$1'))+'=([^&]*)').exec(u);return a&&decodeURIComponent(a[1].replace(/\+/g,' '))};
		Object.defineProperty(window.location,'params',{set:function(){},get:function(){var a={},b=window.location.search.substr(1).split('&');if(b)for(var i in b){b[i]=b[i].replace(/^(?:amp;)?([^=]+)=(.*)?$/,'$1\n$2').split('\n');if(a[b[i][0]]){a[b[i][0]]=[a[b[i][0]]];a[b[i][0]].push(b[i][1])}else a[b[i][0]]=b[i][1]}return a}});
	}
	catch(e)
	{
		if(window.console) console.error('Your browser does not support changes to window.location.', e);
	}

	// Set up the jQuery extension
	window.jQuery.fn.staircase = function(options)
	{
		var $ = window.jQuery;

		if($(this).length == 1 && $(this).data('staircase'))
			return $(this).data('staircase');

		else
			return $(this).each(function()
			{
				if(!$(this).data('staircase'))
					$(this).data('staircase', new Staircase(this, options ? options : {}));
			});
	};

	// Fill any autofill inputs
	window.jQuery('input[staircase-value]').each(function()
	{
		var $ = window.jQuery,
			fillstr = $(this).attr('staircase-value').replace(/#{(.*?)}/g, function(m, key)
			{
				if(key.match(/^date\.(.*)$/i))
					return (new Date / 1000).toDate(key.replace(/^date\.(.*)$/i, '$1'));

				else if(key.match(/^cookies?\.(.*)$/i))
				{
					var cookie = key.replace(/^cookies?\.(.*)$/i, '$1'),
						cookies = document.cookie.split('; ');

					for(var i in cookies)
						if(cookies[i].split('=')[0] == cookie)
							return cookies[i].substr(cookie.length + 1);

					return '';
				}

				else
				{
					key = key.split('.');
					var val = window;

					for(var i in key)
						if(val[key[i]])
							val = val[key[i]];
						else return undefined;

					if(val != window)
						return val;
				}
			});

		$(this).removeAttr('staircase-value').val(fillstr);
	});

	// Title Scanner
	if(!document.title || $('head title').length == 0)
	{
		var title = $('h1, h2, h3, h4, h5, h6').first().text();

		if(!title) title = $('img[alt]').first().attr('alt');
		if(!title) title = ($('p').first().text().trim() || '').split(' ').slice(0, 4).join(' ');
		if(!title) title = ($('body').text().trim() || '').split(' ').slice(0, 4).join(' ');
		if(!title) title = window.location.href.replace(/^(?:f|ht)tps?:\/\/(.*?)\.((com?|org|net|gov|edu)(\.uk)?|info)(\/(.*)?)?$/i, '$1').replace(/(-|\.|)/g, ' ').replace(/(^| )([a-z])/g, function(m,a,b){return a+(b.toUpperCase())});
		if(!title) title = window.location.pathname.substr(1);

		document.title = title;
	}

	// Create an empty global list of staircase instances
	window.Staircases = {};

	// Create the Staircase object
	window.Staircase = function(dom, options)
	{
		var $ = window.jQuery, // Capture jQuery
			$this = $(dom), // Store the DOM element
			$staircase = this, // Create a super
			$scrollTop = 0, // Store the window's scrollTop
			$options = // Populate the default options object
			{
				checkboxGroups: false, // Enable checkbox group scanning
				history: false, // Enable URL hash modifications
				ID: ''.hash(8), // An optional ID string for the URL
				notifyDelay: 3, // Seconds to wait before removing the `staircase-highlight-error` class from an invalid input
				steps: '.step', // Selector for steps
				stepBlur: null, // Extra function to call when a step is hidden from view
				stepFocus: null, // Extra function to call when a step enters the view
				validate: null // Extra function to call during validation
			},

		// Sandbox function (for the string-to-code rule parser)
		sandbox = function($class)
		{
			// WIP

			return $class;
		};

		// Import user-defined options
		if(options && typeof options == 'object')
			for(var i in options)
				$options[i] = options[i];

		// Regular Expression Store
		$staircase.Patterns =
		{
			currency:		/^(-)?([^a-zA-Z0-9 ])?([0-9\,]+)(\.([0-9]{2,}))?$/,
			date:			[/^([0-9]{1,2})(\/|-|\.|,| )([0-9]{1,2})(\/|-|\.|,| )([0-9]{2,4})$/, /^((mon|monday|tue|tues|tuesday|wed|wednesday|thu|thurs|thursday|fri|friday|sat|saturday|sun|sunday)([\s]+))?([0-9]{1,2})(st|nd|rd|th)?([\s]+)?(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)([\s]+)?([0-9]{2,4})$/i, /^([0-9]{2})$/, /^(1|2)([0-9]{3})$/],
			datepicker:		/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
			'default':		/^(?!\s*$).+/,
			email:			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			filename:		/^(([^\/\\\?%\*:|"<>]+)?\.([^\/\\\?%\*:|"<>\.]+)|([^\/\\\?%\*:|"<>\.]+))$/,
			name:			/^([ A-Za-z\.']+)$/,
			number:			[/^(-)?([0-9]+)$/, /^(-)?([0-9]+)\.([0-9]+)$/],
			phone:			[/^(\+([0-9]{1,5})|0)(?!.*(\d)\1{9,})\d{9,}$/, /^(\+([0-9]{1,5})|07)(?!.*(\d)\1{9,})\d{9,}$/, /^(\+33|0)(?!.*(\d)\1{9,})\d{9,}$/],
			postcode:		/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/,
			time:			/^([0-9]{1,2}):([0-9]{2})(:([0-9]{2}))?([\s]+)?(am|pm)?$/i,
			zipcode:		/^(^\d{5}$)|(^\d{5}-\d{4}$)$/
		};

		// Constraints Store
		$staircase.Constraints =
		{
			number:			/^([0-9])$/,
			letter:			/^([a-zA-Z])$/,
			symbol:			/^([^0-9a-zA-Z])$/
		};

		$staircase.$object = $this; // Store the DOM element
		$staircase.$current = 0; // Current step
		$staircase.Steps = []; // Prepare an empty list of steps inside this staircase

		// When the hash or history state changes (i.e. When a user clicks 'Back')
		$(window).bind('hashchange popstate', function()
		{
			var regex = /^#!\/([A-Z0-9<>\!\:\;\,\.\$]{8})\/([0-9]+)$/i;

			// If the URL is blank, go back to the first step
			if(window.location.hash.match(/^#!?\/?$/))
				for(var i in window.Staircases)
					window.Staircases[i].Steps[0].Focus();

			// Otherwise, find the specific staircase/step pair via the URL and show it
			else if(window.location.hash.match(regex))
			{
				var ID = window.location.hash.replace(regex, '$1'),
					step = parseInt(window.location.hash.replace(regex, '$2'));

				if(window.Staircases[ID] && window.Staircases[ID].Steps[step] && window.Staircases[ID].Steps[step].GetQuantum())
					// Focus the step if it exists and has been visited before
					window.Staircases[ID].Steps[step].Focus();
			}

			// Scroll the form back into view
			$(window).scrollTop($scrollTop);
		});

		// Adds a regex pattern
		$staircase.Extend = function(name, pattern)
		{
			$staircase.Patterns[name] = pattern;
			return $staircase;
		};

		// The validation function - all elements with the [validate] attribute will be passed through this function on their change events and on the form's beforesubmit event.
		// This function must return either true [!0] (the input has passed validation) or false [!1] (if it fails)
		$staircase.Validate = function(input)
		{
			// Store the validation type
			var validate = input.attr('validate');

			if(validate)
				// If we're dealing with a select element
				if((validate == 'select' || validate == 'selected') && input.is('select'))
				{
					var myval = input.val(),
						// Find the first <option> in the <select> and store its value to check against
						placeholder = input.find('option').first(),
						placeholderval = (placeholder.attr('value') === undefined) ? placeholder.html() : placeholder.attr('value');

					// If we're dealing with a multiple select
					if(typeof myval == 'object')
					{
						for(var i in myval)
							if(myval[i] == placeholderval)
								return !1;
					}

					// Otherwise just a simple string comparison
					if(myval == placeholderval)
						return !1;

					return !0;
				}

				else
				{
					// If the validator is looking for a checkbox
					if((validate == 'checked' || validate == 'unchecked') && (input.attr('type') == 'checkbox' || input.attr('type') == 'radio'))
						return !((validate == 'checked' && !input.is(':checked')) || (validate == 'unchecked' && input.is(':checked')));

					// Find the element's corresponding regular expression
					var exp = $staircase.Patterns,
						key = (validate.indexOf('[') > -1) ? validate.replace(/\[([0-9]+)\]/g, '\n$1').split('\n') : [validate];

					// If the validation expression exists
					if(exp)
					{
						// Climb the attibute's key list (e.g. phone[0], date[1][2][3], etc.)
						if(key.length > 1)
						{
							for(var i = 0; i < key.length; i ++)
								if(exp[key[i]])
									exp = exp[key[i]];
								else break;
						}

						else
						{
							if(typeof exp[key[0]] == 'object' && !(exp[key[0]] instanceof RegExp))
								exp = exp[key[0]][0];
							else
								exp = exp[key[0]];
						}

						if(exp && exp instanceof RegExp)
							// Use `[0].value` rather than `.val()` to accommodate for <textbox>es
							return !!input[0].value.match(exp);
					}
				}

			if($options.validate && typeof $options.validate == 'function')
				// If all else fails, call the optional user defined function
				return !!$options.validate.call(input[0], $staircase);

			return !1;
		};

		// Address lookup function
		$staircase.Locate = function(postcode, callback)
		{
			return $.ajax(
			{
				url: 'http://staircase.virtuosoadvertising.co.uk/bin/address-lookup.php',
				type: 'post',
				dataType: 'json',
				data: { postcode: postcode },
				success: function()
				{
					if(callback && address && typeof address == 'object' && address.county && address.town && address.street)
					{
						address.postcode = postcode;
						callback(address);
					}
				}
			}), $staircase;
		};

		// Step switching functions
		$staircase.To = function(index)
		{
			if(index < $staircase.$current)
				$staircase.Steps[index].Focus();

			else if($staircase.Steps[index] && $staircase.Steps[$staircase.$current].Validate())
				$staircase.Steps[index].Focus();

			return $staircase;
		};

		$staircase.Next = function()
		{
			if($staircase.Steps[$staircase.$current + 1] && $staircase.Steps[$staircase.$current].Validate())
				$staircase.Steps[$staircase.$current + 1].Focus();

			return $staircase;
		};

		$staircase.Prev = function()
		{
			if($staircase.Steps[$staircase.$current - 1])
				$staircase.Steps[$staircase.$current - 1].Focus();

			return $staircase;
		};

		// Create a subclass to manage steps
		var Step = function()
		{
			var $this = $(arguments[0]), // Store the DOM element
				$step = this, // Create a super
				$qstate = null; // Cache the quantum state
				$toconstrain = 'input:not([type="button"], [type="submit"], [type="image"])[constrain], textarea[constrain]', // Inputs to apply constraints to
				$allinputs = 'input:not([type="button"], [type="submit"], [type="image"])[name], select[name], textarea[name]', // All form data inputs
				$inputs = 'input:not([type="button"], [type="submit"], [type="image"])[validate], select[validate], textarea[validate]', // Input selector
				$buttons = 'input[type="button"].next, input[type="button"].continue, input[type="button"].submit, input[type="submit"], button', // Continue/Submit button selector
				$backbuttons = 'input[type="button"].prev, input[type="submit"].prev, button.prev, input[type="button"].back, input[type="submit"].back, button.back'; // Back button selector

			$step.$index = arguments[1]; // Store the step index
			$step.$object = $this; // Store the DOM element
			$step.$rules = []; // Create a blank rulebook

			// The quantum state of a step changes once it enters focus to keep track of whether a step has been viewed yet or not
			$step.GetQuantum = function()
			{
				return $qstate;
			};

			// `Focus` hides all other steps, shows this step and triggers a focus event on the DOM
			$step.Focus = function(silent)
			{
				// Blur all the other Steps
				for(var i in $staircase.Steps)
					$staircase.Steps[i].Blur(silent);

				// If this Step isn't already in focus
				if(!$this.is(':visible'))
				{
					// Set the current index
					$staircase.$current = $step.$index;

					// Observe the Step's quantum state
					if(!$qstate) $qstate = new Date();

					// Try to trigger a focus event
					if(!silent) $this.trigger('focus');

					// Show the Step
					$this.show();

					// Create the URL string
					var hash = '!/' + $options.ID + '/' + $step.$index;

					// Keep the current scroll position
					$scrollTop = $(window).scrollTop();

					// Update the URL
					if($step.$index > 0 && window.location.hash != '#' + hash)
						location.hash = hash;
					else if($step.$index == 0)
						location.hash = '!/';
				}

				return $step;
			};

			// `Blur` hides the step and triggers a blur event on the DOM
			$step.Blur = function(silent)
			{
				// If this Step isn't already hidden
				if($this.is(':visible'))
				{
					// Try to trigger a blur event
					if(!silent) $this.trigger('blur');

					// Hide the Step
					$this.hide();
				}

				return $step;
			};

			// Perform validation
			$step.Validate = function(input)
			{
				if(!input)
				{
					var result = !0;

					$this.find($inputs).each(function()
					{
						if(!$step.Validate(this))
							result = !1;
					});

					return result;
				}

				input = $(input);

				var valid = !!$staircase.Validate(input), // Convert the validation result to a boolean
					label = input.closest('label').length ? input.closest('label') : ((input.attr('id') && $('label[for="' + input.attr('id') + '"]').length) ? $('label[for="' + input.attr('id') + '"]') : false), // Find this input's label
					apply = $(label ? label.add(input) : input);

				if(!valid)
				{
					// Apply the error classes
					apply.addClass('staircase-has-error staircase-highlight-error');

					// Remove the error notification class
					apply.data('notify-timeout', setTimeout(function(){ apply.removeClass('staircase-highlight-error'); },

						// If the delay is larger than 30, interpret it as milliseconds. Otherwise, interpret as seconds and adjust
						$options.notifyDelay > 30 ? $options.notifyDelay : ($options.notifyDelay * 1000)));

					return !1;
				}

				else
				{
					// Remove the error classes
					apply.removeClass('staircase-has-error staircase-highlight-error');

					// Clear the notification class timer so that no classes are unintentionally removed in the near future
					if(apply.data('notify-timeout'))
						window.clearTimeout(apply.data('notify-timeout'));
				}

				return !0;
			};

			// Add a condition to the rulebook
			$step.Condition = function(code)
			{
				if(typeof code != 'function' && typeof code != 'string')
					return $step;

				var args = ['Staircase', 'Step', '$'],
					inputs = {};

				$this.find('input:not([type="button"], [type="submit"], [type="image"])[name], textarea[name], select[name]').each(function()
				{
					var name = $(this).attr('name');

					if(inputs[name])
					{
						inputs[name] = [inputs[name]];
						inputs[name].push(this);
					}
					else
					{
						args.push(name);
						inputs[name] = this;
					}
				});

				$step.$rules.push({ callback: (typeof code == 'function') ? code : new Function(args, code), inputs: inputs });

				return $step;
			};

			// Bind constraints
			$this.find($toconstrain).bind('keydown', function(e)
			{
				var constraint = $(this).attr('constrain');
					constraint = $staircase.Constraints[constraint] ? $staircase.Constraints[constraint] : null;

				if(constraint && !String.fromCharCode(e.keyCode).match(constraint))
					return !1;
			});

			// Bind each validatable input field within this step to the validate function
			$this.find($inputs).bind('change blur validate', function()
			{
				$step.Validate(this);
			});

			$this.find($backbuttons).not($buttons).bind('click', function()
			{
				if($step.$index > 0)
					$staircase.Steps[$step.$index - 1].Focus();

				return !1;
			});

			$this.find($buttons).not($backbuttons).bind('click', function()
			{
				// trigger validation on each input
				$this.find($inputs).trigger('validate');

				// If validation has passed (or been ignored) check for checkbox groups
				if($options.checkboxGroups)
				{
					// If a selector has been specified, search for it. Fallback to `.checkbox-group`, then to the Step's DOM Element.
					var group = (typeof $options.checkboxGroups == 'string') ? $this.find($options.checkboxGroups) : (($this.find('.checkbox-group').length) > 0 ? $this.find('.checkbox-group') : $this);

					// If the group does not contain any other type of input, we can continue with the validation
					if(group.find('input:not([type="button"], [type="submit"], [type="image"]), select, textbox').length == group.find('input[type="checkbox"]').length)
					{
						// If no checkboxes within the group are checked
						if(group.find('input[type="checkbox"]:checked').length == 0)
						{
							// Apply the error classes
							group.addClass('staircase-has-error staircase-highlight-error');

							// Remove the error notification class
							group.data('notify-timeout', setTimeout(function(){ group.removeClass('staircase-highlight-error'); },

								// If the delay is larger than 30, interpret it as milliseconds. Otherwise, interpret as seconds and adjust
								$options.notifyDelay > 30 ? $options.notifyDelay : ($options.notifyDelay * 1000)));
						}

						// Otherwise, remove the error classes
						else
						{
							// Remove the error classes
							group.removeClass('staircase-has-error staircase-highlight-error');

							// Clear the notification class timer so that no classes are unintentionally removed in the near future
							if(group.data('notify-timeout'))
								window.clearTimeout(group.data('notify-timeout'));
						}
					}
				}

				if($this.hasClass('staircase-has-error') || $this.find('.staircase-has-error').length > 0)
					return !1; // If there are any errors, cancel the submit event

				// Process any hard-coded rules
				var ruleresult = !0;
				for(var i in $step.$rules)
				{
					// Prepare the Staircase and Step arguments as sandboxed functions with limited access to Staircase
					var args = [sandbox($staircase), sandbox($step), window.jQuery];

					// Loop through the inputs that were present when the rule was set up (to prevent any hacking or muddling)
					for(var j in $step.$rules[i].inputs)
					{
						var input = $($step.$rules[i].inputs[j]);

						// Check for checkboxes or radio boxes
						if(input.length > 1) input = input.filter(function()
						{
							return (($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') && !$(this).is(':checked')) ? !1 : !0;
						});

						// Add the input's value to the rule arguments
						args.push((input.length > 0) ? (input.length > 1 ? (function(a, b){ a.each(function(){ b.push($(this)[0].value) }); return b })(input, []) : input[0].value) : undefined);
					}

					// Execute the rule
					if($step.$rules[i].callback.apply(window, args) === false)
						ruleresult = !1;
				}
				if(!ruleresult) return !1;

				// If this is NOT the last step, focus the next step and cancel the submit event
				if($staircase.Steps.length > ($step.$index + 1))
					return $staircase.Steps[$step.$index + 1].Focus(), !1;

				// If there is no form, default to debug
				if(!$this.closest('form').length && window.console)
				{
					console.log('%cStaircase Submit Event:', 'font-weight: bold; font-size: 1.2em; color: #333;');
					console.log('%cYou are seeing this table because no submissible <form> element was found in the DOM.', 'font-size: .8em;');
					console.log(' ');

					var table = [];

					$($allinputs).each(function()
					{
						table.push({ Field: $(this).attr('name'), Value: this.value });
					});

					if(window.console.table)
						console.table(table, ['Field', 'Value']);

					else
						console.log(table);
				}
			});

			$this.find('script[type="staircase/condition"]').each(function()
			{
				$step.Condition($(this).html());
			}).remove();

			return $step; // Supply the resulting step object
		};

		// Find each step within this Staircase and assign it a Step object
		$this.find($options.steps).each(function()
		{
			$staircase.Steps.push(new Step(this, arguments[0]).Blur(!0)); // Save the step to the list
		});

		// Show the first step without triggering an event
		$staircase.Steps[0].Focus(!0);

		// Add this instance to the global list
		window.Staircases[$options.ID] = $staircase;

		return $staircase; // Supply the resulting staircase object
	};
})();