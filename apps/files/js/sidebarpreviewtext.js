/*
 * Copyright (c) 2016
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function () {
	var SidebarPreview = function () {
	};

	SidebarPreview.prototype = {
		attach: function (manager) {
			manager.addPreviewHandler('text', this.handlePreview.bind(this));
		},

		handlePreview: function (model, $thumbnailDiv, $thumbnailContainer, fallback) {
			var previewWidth = $thumbnailContainer.parent().width() + 50;  // 50px for negative margins
			var previewHeight = previewWidth / (16 / 9);

			this.getFileContent(model.getFullPath()).then(function (content) {
				$thumbnailDiv.removeClass('icon-loading icon-32');
				$thumbnailContainer.addClass('large');
				$thumbnailContainer.addClass('text');
				var $textPreview = $('<pre/>').text(content);
				$thumbnailDiv.children('.stretcher').remove();
				$thumbnailDiv.append($textPreview);
				$thumbnailContainer.css("max-height", previewHeight);
			}, function () {
				fallback();
			});
		},

		getFileContent: function (path) {
			return $.get(OC.linkToRemoteBase('files' + path));
		}
	};

	OC.Plugins.register('OCA.Files.SidebarPreviewManager', new SidebarPreview());
})();
