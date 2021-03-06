//
//  UserService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation
import Alamofire

class UserNetworkService: NetworkService {
    enum Endpoint: String {
        case github = "/user/github/ios"
        case apple = "/user/apple"
    }
    
    let endPoint: Endpoint
    
    init(endPoint: Endpoint) {
        self.endPoint = endPoint
    }
    
    private func url() -> URL? {
        let base = baseURL + endPoint.rawValue
        return URL(string: base)
    }
    
    func post(code: String, name: String, image: String = "https://avatars2.githubusercontent.com/u/46195613?v=4") {
        guard let url = url() else { return }
        let params: [String: String] = [ "code": code,
                                         "name": name,
                                         "image": image ]
        
        AF.request(url, method: .post, parameters: params)
            .validate()
            .responseJSON { response in
            switch response.result {
            case .success(let value):
                guard let dic = value as? [String: Any],
                      let token = dic["token"] as? String else { return }
                
                NotificationCenter.default.post(name: .succeededBySign, object: nil, userInfo: ["token": token])
            //통신실패
            case .failure(let error):
                print("error: \(String(describing: error.errorDescription))")
            }
        }
    }
}

