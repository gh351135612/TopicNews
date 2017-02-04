package pojo.response;

/**
 * @Author chenxl
 * @Date 2017/1/22 13:38
 * @Describle
 */
public class BasicResponse {

    public static int SUCCESS = 200;
    public static int PARAM_ERROR = 100;
    public static int OTHER_ERROR = 101;


    private int code;
    private String msg;

    @Override
    public String toString() {
        return "BasicResponse{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
