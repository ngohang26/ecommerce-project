package com.tutorial.apidemo.ecommerce.backend.response;

import java.util.List;

public class ImageData {
    private List<String> fileNames;
    private List<String> thumbnailNames;
    private List<String> largeImageNames;

    public ImageData(List<String> fileNames) {
        this.fileNames = fileNames;
        this.thumbnailNames = thumbnailNames;
        this.largeImageNames = largeImageNames;
    }

    public List<String> getFileNames() {
        return fileNames;
    }

    public void setFileNames(List<String> fileNames) {
        this.fileNames = fileNames;
    }

    public List<String> getThumbnailNames() {
        return thumbnailNames;
    }

    public void setThumbnailNames(List<String> thumbnailNames) {
        this.thumbnailNames = thumbnailNames;
    }

    public List<String> getLargeImageNames() {
        return largeImageNames;
    }

    public void setLargeImageNames(List<String> largeImageNames) {
        this.largeImageNames = largeImageNames;
    }
}
