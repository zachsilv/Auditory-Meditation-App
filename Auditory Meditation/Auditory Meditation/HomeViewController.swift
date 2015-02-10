//
//  ViewController.swift
//  Auditory Meditation
//
//  Created by Zach Silverman on 2/7/15.
//  Copyright (c) 2015 ZAS. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var First_Image: UIImageView!
    @IBOutlet weak var Second_Image: UIImageView!
    @IBOutlet weak var Third_Image: UIImageView!
    @IBOutlet weak var Fourth_Image: UIImageView!
    @IBOutlet weak var Trial_Button: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.First_Image.image = UIImage.init(named: "city")
        self.Second_Image.image = UIImage.init(named: "nature")
        self.Third_Image.image = UIImage.init(named: "safari")
        self.Fourth_Image.image = UIImage.init(named: "kitchen")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
}

