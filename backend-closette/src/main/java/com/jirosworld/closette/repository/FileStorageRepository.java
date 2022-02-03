package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.FileUploadResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FileStorageRepository extends JpaRepository<FileUploadResponse, Long>, JpaSpecificationExecutor<FileUploadResponse> {

        }