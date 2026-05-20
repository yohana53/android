// Admin Script - File Upload Handling

document.addEventListener('DOMContentLoaded', function() {
    const toolsForm = document.getElementById('toolsForm');
    const driversForm = document.getElementById('driversForm');
    const filesList = document.getElementById('filesList');

    // Initialize uploads from localStorage
    loadUploadedFiles();

    // Handle Tools Upload
    toolsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFileUpload('tools', this);
    });

    // Handle Drivers Upload
    driversForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFileUpload('drivers', this);
    });

    function handleFileUpload(type, form) {
        const fileInput = form.querySelector('input[type="file"]');
        const descriptionInput = form.querySelector('textarea');
        const files = fileInput.files;

        if (files.length === 0) {
            showMessage('error', 'Please select at least one file');
            return;
        }

        // Get existing uploads from localStorage
        let uploads = JSON.parse(localStorage.getItem('uploads')) || [];

        // Process each selected file
        for (let file of files) {
            const fileData = {
                id: Date.now() + Math.random(),
                type: type,
                name: file.name,
                size: formatFileSize(file.size),
                description: descriptionInput.value || 'No description',
                uploadDate: new Date().toLocaleString(),
                fileType: file.type
            };

            uploads.push(fileData);
        }

        // Save to localStorage
        localStorage.setItem('uploads', JSON.stringify(uploads));

        // Show success message
        showMessage('success', `${files.length} ${type} file(s) uploaded successfully!`);

        // Reset form
        form.reset();

        // Refresh files list
        loadUploadedFiles();
    }

    function loadUploadedFiles() {
        const uploads = JSON.parse(localStorage.getItem('uploads')) || [];

        if (uploads.length === 0) {
            filesList.innerHTML = '<p class="empty-state">No files uploaded yet</p>';
            return;
        }

        filesList.innerHTML = '';

        uploads.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <div class="file-name">
                        <span class="file-type-badge" style="margin-right: 8px; padding: 2px 8px; background: ${getTypeColor(file.type)}; color: white; border-radius: 3px; font-size: 11px; font-weight: 600;">
                            ${file.type.toUpperCase()}
                        </span>
                        ${escapeHtml(file.name)}
                    </div>
                    <div class="file-meta">
                        Size: ${file.size} | Uploaded: ${file.uploadDate}
                    </div>
                    <div class="file-meta" style="margin-top: 5px;">
                        Description: ${escapeHtml(file.description)}
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn btn-danger" onclick="deleteFile(${file.id})">Delete</button>
                    <button class="btn btn-primary" style="background: #4CAF50; padding: 6px 12px; font-size: 12px;" onclick="downloadFile('${escapeHtml(file.name)}')">Download</button>
                </div>
            `;
            filesList.appendChild(fileItem);
        });
    }

    // Show message notification
    function showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the top of upload-section
        const uploadSection = document.querySelector('.upload-section');
        uploadSection.insertBefore(messageDiv, uploadSection.firstChild);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Get color based on file type
    function getTypeColor(type) {
        const colors = {
            'tools': '#667eea',
            'drivers': '#764ba2'
        };
        return colors[type] || '#999';
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
});

// Global function to delete file
function deleteFile(id) {
    if (confirm('Are you sure you want to delete this file?')) {
        let uploads = JSON.parse(localStorage.getItem('uploads')) || [];
        uploads = uploads.filter(file => file.id !== id);
        localStorage.setItem('uploads', JSON.stringify(uploads));
        
        // Reload the page to refresh the list
        location.reload();
    }
}

// Global function to download file (simulated)
function downloadFile(filename) {
    // Note: In a real application, this would download from a server
    // For now, we'll show a message
    alert(`Download started for: ${filename}\n\nNote: Actual file download would require a backend server.`);
    console.log('Download initiated for:', filename);
}
