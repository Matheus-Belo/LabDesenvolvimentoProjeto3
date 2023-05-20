package sistemamoedas.enums;

import java.io.Serializable;


public enum AdvantageStatusEnum implements Serializable {
    AVAILABLE("AVAILABLE"),
    SOLD("SOLD");

    private final String code;

    AdvantageStatusEnum(String code) {
        this.code = code;
    }

    public static AdvantageStatusEnum getByCd(String cd) {
        for(AdvantageStatusEnum e : values()) {
            if(e.code.equals(cd)) return e;
        }
        return null;
    }

    public String getCode() {
        return code;
    }
}

