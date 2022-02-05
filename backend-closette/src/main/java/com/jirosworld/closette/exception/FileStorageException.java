package com.jirosworld.closette.exception;

import java.io.Serial;

public class FileStorageException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

//    public FileStorageException() {
//        super();
//    }

//    public FileStorageException(String message) {
//        super(message);
//    }

    public FileStorageException(String s) {
        super(s + "Issue in storing the file - there is a 3 MB maximum.");
    }

}