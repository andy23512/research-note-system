### 20191013 [#736 Tray view requirement for CGMH](https://gitlab.com/DYSK_Labs/website/issues/736)
- css filter brightness darken
  - 在玻片管理系統上，使用者要可以自定義案例標籤的顏色，這個顏色會反映在案例標籤的圖示。而這個圖示會出現在案例標籤列表，還有案例表格以及玻片表格的案例標籤欄位。然而案例標籤列表為接近黑色背景，表格為白色背景，如果在這兩處用同樣的圖示顏色呈現，勢必會讓其中一邊的對比不夠明顯。而也不可能請使用者給定在這兩處選擇用不同的顏色表示，這樣不但會對使用者造成困擾，也會讓兩個地方的顏色不一致。最後採用的做法是透過階層式樣式表(CSS)中的濾鏡(filter)效果，把在表格處的圖示的顏色亮度略為降低，這樣不但可以保持顏色一定程度上一致，也可以減少對比不足的問題。
- cancelUncompleted in ngxs
  - 在網頁上，如果在使用者變更搜尋條件後，就立刻向伺服器發送請求的話，在頻繁操作的情況下，勢必會讓各種請求塞車，還有各種競爭條件存在，比如可能先後送了兩個請求，但第二個請求的回應提早回來並顯示在畫面上後，第一個請求的回應才回來再次更新畫面的話，畫面上顯示的並不是最新的搜尋條件的結果。而專案中前端是使用NGXS這套狀態管理程式的，裡面可以設定各種觸發狀態變更的行為(action)，如果在行為的處理器(handler)加上cancelUncompleted這個設定的話，就可以在有重複行為被觸發時，取消掉先前的還在處理中的行為，只留下最新的行為。
- Shared StudyTag module
  - 前端Angular框架的模組化是可以利用feature module來區分各種頁面或者各種功能的模組，之後可以在特定條件下懶載入，只有到那個頁面或者使用者符合特定條件時才載入那個模組，這樣可以不用在一開始就載入所有功能，提升使用的流暢度，開發時也可以用這樣區分，減少各自開發不同模組時的衝突。而有一些如component、service等angular中的組成單元，要在模組之間共用時，就可以創造出shared module，定義並匯出那些需要共用的單元，然後在要用到的feature module內import後，就可以在裡面使用那些匯出的單元，如此可以減少重複的code。
### 20191015 [#782 Accelerate jest with new transformIgnorePattern](https://gitlab.com/DYSK_Labs/website/issues/782)
- transformIgnorePattern
  - 自從開始引入3D引擎套件three和醫療影像套件ami.js後，前端的單元測試就有顯著的變慢，原本一分鐘內可跑完的單元測試，變成需要半小時以上，一開始是找不太到原因，直到一次專注在解決這個問題時，才發現原因是出在jest的transformIgnorePattern設定。在預設的情況下，jest並不會去對安裝的node.js套件，即在node_modules資料夾內的程式碼進行轉編譯，因為一般來說我們引入的都是轉好的可直接使用的JavaScript程式碼，但因為引入的three與ami.js的模組需要再經過轉編譯，所以需要設定讓這些模組的路徑不符合transformIgnorePattern，因此原先設定node_modules/(?!ami.js|three)/，就可以讓ami.js和three的模組也會被轉譯，而問題就在於程式中也有引入整個three，而造成整個three轉好並壓縮好後的JavaScript大檔案也會經過轉編譯，就會拉長執行時間，最後修改這個pattern為node_modules/(?!ami.js/src/(.*).js|three/src/(.*).js|ami.js/node_modules/three/src/(.*).js，亦即只不忽略需要轉編譯的src底下的js檔就好了。如此執行時間又再度回到一分鐘左右了。
### 20191022 [#755 Editable columns on the slide manager](https://gitlab.com/DYSK_Labs/website/issues/755)
- single field form
  - 在django中，要產生表單可以用它內建的表單相關的class協助產生，可以支援直接從model class產生表單，並整合後續驗證、儲存及更新的功能，相當方便。但是有個需求是要讓玻片表格中的特定資料可以獨立編輯，亦即如Excel那樣的編輯感覺。如果要支援這種，後端就要針對每個欄位都要有能力產生出對應的表單class，直接人工一個一個class寫是很難維護的，因為未來能編輯的欄位可能會增減，還有可能有其他地方也會有一樣的需求，因此最後就是另外寫了一個function，這個function的輸入參數為一個表單class和一個給定的欄位名稱，輸出就會是一個繼承自輸入的class的表單class，但只有給定的那一個欄位會留下。如此一來就可以利用這個function去產生獨立的每個欄位的表單class，不用再每個欄位都另外人工定義表單class。
- extract common logic to function
  - 隨著各種專案和需求的增加，逐漸可以看出一些會到處使用的類似的邏輯和程式碼，如能有效得把這些共用的邏輯和程式碼合在一起，然後並且加上文件與測試，如此這樣累積起來，會讓後續的開發越來越順。而在目前影像或資料管理系統的部分，表單是很常用的用來改變資料的元件，也因此目前專案內已經有部分是已經有抽出來共用了。比如表單部分，從向後端取得表單的資料、繪製表單在畫面上、送出表單、錯誤處理，這些幾乎都是每個表單會用到的東西，目前整套流程已經以shared module形式完善，遇到特殊表單需求也可以利用各種元件繼承的手法達成，常用的流程比如從表單資料轉換成angular FormGroup物件，從FormGroup物件轉換成可送出的表單資料，也都抽出變成可共用的function形式，如此可以大大減低重複的程式碼，提高開發效率。
### 20191024 [#741 Upgrade to jest 24 and Angular 8](https://gitlab.com/DYSK_Labs/website/issues/741)
- jest 24 angular 8
  - 日前jest很慢的時候，曾經有想過是不是jest版本問題導致很慢，也有各種文章及github issue顯示23版有些版本可能有效能問題，另外還有帶有自定義的alias的module會有不能mock的問題，於是就開了一個issue來嘗試升級jest版本至24版。而又因為node.js的各種套件相依問題，Angular也需要升級隨之升級到8版，所幸angular官方有詳細的遞移指南，有完整以待辦清單的形式列出有哪些需要改動的地方，讓升級過程不至於太多問題，但是目前還有一些新TypeScript的編譯錯誤，這些還有待修理，何況還有多人開發的情況下，更新這個branch就是還要一直不斷的merge及更新，然後一個一個確認功能都正常後，才有辦法將這次更新正式合併開發的主分支上，這將會是一個長久的更新過程。
### 20191024 [#780 UI improvement of share detail from tag management.](https://gitlab.com/DYSK_Labs/website/issues/780)
- check large amount
  - 在開發中測試時，通常為了方便，就只會用各種短的名稱，並用少量的資料和選擇少量的選項去測試功能是否正常，但是有些內容量超過一定程度就會換行或者多欄式的排版，就要考慮內容量是否會造成爆版。這點其實不太容易發現，也通常要到實際上使用透過測試人員或者使用者反映才曾夠發現，或許未來導入端對端測試時有機會靠各種截圖人工事先提早發現問題，應該能有效降低這種版面不正確的情況發生，只是要如何讓端對端涵蓋到各種這樣的情況，勢必是未來的一個待解決的問題及挑戰。
### 20191024 [#806 setImmeditate is not defined bug](https://gitlab.com/DYSK_Labs/website/issues/806)
- setImmediate
  - 在JavaScript或TypeScript會經過各種轉編譯或打包流程，再放到網頁上去執行的流程中，其實流程中做了什麼和添加什麼，有時候是很難一眼看出來的，因為有些會是那些流程的預設值，甚至有些可能也會在文件中漏掉，要一個一個仔細看過和追原始碼是很困難的，也更別提那些套件以及其相依套件也會每天在更新。也因此有些奇怪的情況會發生，例如明明都是同一份程式，在開發環境轉編出來的沒有問題，但是正式發布的版本卻出現某個內建函式不存在的問題，原因可能就是因為開發環境會增加一些polyfills，把那些各瀏覽器之間的差異弭平，但如果轉編譯發布版本時沒有注意，也恰巧執行在不支援某個用到的內建函式的話，問題就發生了。所以要用任何內建函式或功能時，都要先去確認瀏覽器的支援度，才能減少這種問題。
### 20191025 [#812 Remove IP restriction functionality](https://gitlab.com/DYSK_Labs/website/issues/812)
- remove ip restriction
  - 刪除某個功能有時會比新增功能還要困難，尤其是在大系統的情況下，某個功能的相關資料表可能又會關聯到各種資料表的欄位，如果中間有漏刪掉各種外鍵還有有用到這個外鍵的程式的話，就會產生各種隱藏的問題。更別說可能還有前端也用到這個欄位，就會連帶出現問題。因此在刪的時候，就也要把關聯的概念考慮進去，比如刪除A資料表時，就要從程式碼中透過grep之類的指令或方式，找到任何與A資料庫相關的程式去處理，之後再考慮刪除與A資料表關聯的欄位，也用類似的方式找出有用到該欄位的地方。然後最後還要再對有影響到的地方的功能實際測試確定沒有問題，如此才能確定這功能安全地被刪除掉。
### 20191029 [#822 Tray view feedback from CGMH](https://gitlab.com/DYSK_Labs/website/issues/822)
- django annotate
  - django的ORM對於SQL中用現有欄位去計算出的新欄位，可以透過QuerySet的annotate方法來達成，而這個新欄位進而後續可以用在過濾或者排序上，是滿進階的django ORM用法，用得好的話可以省掉不少在python中對資料進行處理或排序的時間，而這次是用在要處理是否在案例裡全部的玻片都存在的狀態進行排序，於是可以先利用Case及When的運算，取得這個狀態，即比較全部玻片和已經存在的玻片的數量，如果已經存在的玻片數量小於全部玻片數量，則設為1，不小於時設為0，將這個狀態透過annotate方式設定為QuerySet中的新欄位，這樣之後即可用這個欄位排序，就可以達到需求。django的ORM方法中應該還有很多這種高效能的方式，之後有時間是值得細細研究及應用。
### 20191102 [#847 Globally handle and show 5xx error in frontend](https://gitlab.com/DYSK_Labs/website/issues/847)
- http interceptor
  - 有個需求是在後端伺服器回狀態碼5開頭，也就是通常是伺服器發生問題時，在前端右上角顯示提示窗。因為在angular中幾乎都是以HttpClient這個service的方法去進行對伺服器進行非同步請求，所以最直覺的方式就是在所有用HttpClient的地方都加上這個錯誤處理，但是這不但會讓同樣的錯誤處理程式重複很多次，也會需要在弄新的功能時要記得加上去，這樣實在不是一個好方式。而在angular中提供了interceptor這個設定，這個設定是可以攔截從HttpClient來的伺服器回應，然後可以讓開發者在回應後設定統一的處理器，於是就寫了一個interceptor去攔截狀態碼為5開頭的回應，然後顯示需要的提示窗出來，這樣之後如果要修正或什麼，只要動這個地方就好了，我覺得這是一個angular內很厲害的設計，考量了很多實際上會有的狀況。
### 20191102 [#762 DICOM viewer questions from CGH](https://gitlab.com/DYSK_Labs/website/issues/762)
- dicom coordinate systems
  - 有使用者反映DICOM 3D檢視器內的座標和他們所使用的DICOM檢視器軟體的座標不同，所以就仔細的研究一下，使用者所用的DICOM檢視器軟體所用的XY座標直接會是像素座標系，也就是直接由DICOM內的pixel data欄位的二維陣列的座標為位置。而專案所用的套件ami.js，可能因為要維持3D呈現後的位置要接近現實尺度，所以會特別使用以病人為基準的座標系統，並考慮到每個像素的實際尺度，也因為有這層轉換在，使得同時載入不同方向的影像時還有辦法對應到一樣的位置。但是像素座標在比如要匯出某區域的影像時還是會用到，畢竟是要從pixel data中取出需要的區域，也只能用像素座標去指定。
### 20191104 [#819 E2E test](https://gitlab.com/DYSK_Labs/website/issues/819)
- e2e test
  - E2E test端對端測試一直以來是公司專案中缺少的一塊，因為他的撰寫成本是相對比較高的，執行速度也比較慢。但隨著專案越來越龐大，已經很難透過人工測試確認以前的所有功能都完全沒有問題了，因為這樣不僅很花時間，也很難有效率的重現錯誤，更別說要做到跨瀏覽器和不同大小裝置和多語言之類的狀況，這些不斷的人工測試累積的成本是很可觀的。目前預計採用Jest測試框架加上puppeteer這套支援自動操作瀏覽器的套件。Jest是目前相對最大最快的JavaScript測試框架，背後由Facebook維護，因此相對穩定且好用。angular搭配使用的E2E測試框架protractor目前僅能搭配Jasmine，並無法跟Jest合用，且目前Unit test的部分是改用Jest，所以在編輯器上會出現一些問題(編輯器會無法辨識現在是要用哪套測試框架的語法)。於是就獨立弄一套出來，與我有用過的puppeteer套件一起組合成E2E方案，期待未來能用這E2E測試，降低以後需要人工測試的時間，並提早發現並解決技術問題。
