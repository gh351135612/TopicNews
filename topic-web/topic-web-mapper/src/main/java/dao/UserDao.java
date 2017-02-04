package dao;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import pojo.user.RegistBean;
import pojo.user.User;

import java.util.List;



@Repository
public interface UserDao {

    String TOPIC_USER = "topic_user";

    @Select("select * from " + TOPIC_USER + " where username = #{username}")
    List<User> selectUserByName(String username);

    @Insert("insert into " + TOPIC_USER + "(username,password,nickname,age,sex) values (#{username},#{password},#{nickname},#{age},#{sex})")
    boolean insertUser(RegistBean registBean);

    @Select("select count(*) from " + TOPIC_USER)
    int count();



}
