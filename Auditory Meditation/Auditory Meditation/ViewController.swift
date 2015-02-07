//
//  ViewController.swift
//  Auditory Meditation
//
//  Created by Zach Silverman on 2/7/15.
//  Copyright (c) 2015 ZAS. All rights reserved.
//

import UIKit

class ViewController: UIViewController {


    @IBOutlet weak var App_Name: UILabel!
    @IBOutlet weak var First_Image: UIImageView!
    @IBOutlet weak var Second_Image: UIImageView!
    @IBOutlet weak var Third_Image: UIImageView!
    @IBOutlet weak var Fourth_Image: UIImageView!
    @IBOutlet weak var Discover_Button: UIButton!
    var counter = 1
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func Discover_ButtonTapped(sender: AnyObject) {
        
        if (counter == 1) {
            self.First_Image.image = UIImage.init(named: "city")
        }
        else if (counter == 2) {
            self.Second_Image.image = UIImage.init(named: "nature")
        }
        else if (counter == 3) {
            self.Third_Image.image = UIImage.init(named: "kitchen")
        }
        else {
            self.Fourth_Image.image = UIImage.init(named: "safari")
        }
        counter += 1
        
        
//        self.First_Image.image = UIImage.init(named: "city")
//        self.Second_Image.image = UIImage.init(named: "nature")
//        self.Third_Image.image = UIImage.init(named: "safari")
//        self.Fourth_Image.image = UIImage.init(named: "kitchen")
    }
    
    
}

