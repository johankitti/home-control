package com.lab.kitti.homecontrollighting;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;


public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView myWebView = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        myWebView.setWebChromeClient(new WebChromeClient());
        myWebView.loadUrl("http://192.168.0.12:8080/lighting");
    }
}