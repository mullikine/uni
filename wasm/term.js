(function() {
	// Provide a readline-like input.
	window.term = function(output, input, cb) {
		var hist = [], histIndex = 0;
		input.addEventListener('keydown', function(e) {
			if (e.ctrlKey && e.keyCode === 76) {  // ^L
				e.preventDefault();
				output.innerText = '';
				return;
			}

			//console.log(e.keyCode);
			if (e.keyCode === 38) {  // Arrow up
				e.preventDefault();
				this.value = hist[hist.length - histIndex - 1] || '';
				if (histIndex < hist.length - 1)
					histIndex++;
				return;
			}
			if (e.keyCode === 40) {  // Arrow down
				e.preventDefault();
				this.value = hist[hist.length - histIndex] || '';
				if (histIndex > 0)
					histIndex--;
				return;
			}

			if (e.keyCode !== 13)  // Enter
				return;

			e.preventDefault();

			output.innerText += '$ uni ' + this.value + "\n";

			hist.push(this.value);
			var cmd = this.value.split(' ');
			this.value = '';
			if (cmd.length === 0)
				return;
			if (cmd[0] !== 'uni')
				cmd = ['uni'].concat(cmd);

			cb(cmd);
		});
	};
}());
