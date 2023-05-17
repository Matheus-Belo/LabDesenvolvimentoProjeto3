package sistemamoedas.enums;

import java.io.Serializable;


public enum TransactionTypeEnum implements Serializable {
    DEPOSIT("DEPOSIT"),
    SALE("SALE");

    private final String code;

    TransactionTypeEnum(String code) {
        this.code = code;
    }

    public static TransactionTypeEnum getByCd(String cd) {
        for(TransactionTypeEnum e : values()) {
            if(e.code.equals(cd)) return e;
        }
        return null;
    }

    public String getCode() {
        return code;
    }
}

