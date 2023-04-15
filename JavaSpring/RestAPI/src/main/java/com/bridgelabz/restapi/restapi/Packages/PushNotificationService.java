/*
 * package com.bridgelabz.restapi.restapi.Packages;
 * 
 * import com.onesignal.OneSignal;
 * import org.json.JSONObject;
 * import org.springframework.stereotype.Service;
 * 
 * @Service
 * public class PushNotificationService {
 * 
 * private static final String ONESIGNAL_APP_ID = "<your-onesignal-app-id>";
 * private static final String ONESIGNAL_API_KEY = "<your-onesignal-api-key>";
 * 
 * public void sendNotification(String title, String message) {
 * JSONObject notification = new JSONObject();
 * notification.put("title", title);
 * notification.put("body", message);
 * 
 * JSONObject pushNotification = new JSONObject();
 * pushNotification.put("app_id", ONESIGNAL_APP_ID);
 * pushNotification.put("contents", notification);
 * 
 * OneSignal.postNotification(pushNotification, ONESIGNAL_API_KEY);
 * }
 * }
 */