//
//  ViewController.m
//  home-control-lighting
//
//  Created by Johan Kitti on 04/07/15.
//  Copyright (c) 2015 Johan Kitti. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@property (weak, nonatomic) IBOutlet UIWebView *webView;

@end

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  NSString *urlString = @"http://192.168.0.12:8080/lighting";
  NSURL *url = [NSURL URLWithString:urlString];
  NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
  [_webView loadRequest:urlRequest];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

@end
