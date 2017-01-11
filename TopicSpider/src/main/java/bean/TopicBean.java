package bean;

/**
 * @Author chenxl
 * @Date 2016/12/26 20:49
 * @Describle
 */
public class TopicBean {

    private String topicTitle;
    private String urlPath;

    @Override
    public String toString() {
        return "TopicBean{" +
                "topicTitle='" + topicTitle + '\'' +
                ", urlPath='" + urlPath + '\'' +
                '}';
    }

    public TopicBean() {

    }


    public TopicBean(String topicTitle, String urlPath) {
        this.topicTitle = topicTitle;
        this.urlPath = urlPath;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }
}
