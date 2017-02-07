package pojo.user;

import java.sql.Timestamp;

/**
 * Created by Zhangxq on 2016/7/15.
 */
public class User {

    private String username;
    private String password;
    private String nickname;
    private int age;
    private int sex;
    private String headUrl;
    private Timestamp registDate;

    public String getHeadUrl() {
        return headUrl;
    }

    public void setHeadUrl(String headUrl) {
        this.headUrl = headUrl;
    }

    public Timestamp getRegistDate() {
        return registDate;
    }

    public void setRegistDate(Timestamp registDate) {
        this.registDate = registDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
}
