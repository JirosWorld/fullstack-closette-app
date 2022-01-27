import http from "./http-common";

// mijn API endpoints
// POST	http://localhost:8080/single/uploadDb = upload a File
// GET	http://localhost:8080/photos = get List of Files (name & url)
// GET	http://localhost:8080/photos/[filename] = download 1 File

function FileUploadService() {
    function upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/single/uploadDb", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    function getFiles() {
        return http.get("/photos");
    }
}

export default FileUploadService;