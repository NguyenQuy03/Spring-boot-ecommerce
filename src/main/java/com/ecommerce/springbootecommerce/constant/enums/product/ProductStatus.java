package com.ecommerce.springbootecommerce.constant.enums.product;

public enum ProductStatus {
    ACTIVE("all"),
    INACTIVE("inactive"),
    SOLD_OUT("soldout"),
    LIVE("live"),
    REMOVED("removed");

    private String status;

    ProductStatus(String status) {
        this.status = status;
    }

    private String getStatus() {
        return this.status;
    }

    public static ProductStatus get(String status) {
        for (ProductStatus item : ProductStatus.values()) {
            if (status.equals(item.getStatus())) {
                return item;
            }
        }

        return null;
    }

}
