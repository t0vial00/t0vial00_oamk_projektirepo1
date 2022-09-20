#include <QCoreApplication>
#include <QDebug>
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>
#include <QUrlQuery>
#include <QJsonDocument>
#include <QJsonObject>
#include <QTextStream>
#include <string>
#include <iostream>

    void sendRequest();
    void postRequest();
    void menu();

    int main(int argc, char *argv[])
    {
     QCoreApplication a(argc, argv);
     menu();
     return a.exec();
    }
void menu()
    {
        int i;
        QTextStream(stdout) << "Menu:\n 1: show cars \n 2: add car \n" << Qt::endl;
        scanf("%d", &i);

        switch (i)
        {
        case 1: sendRequest(); break;
        case 2: postRequest(); break;
        }

    return;

    }
void postRequest(){
    char mod[100];
    char bran[100];
    QTextStream(stdout) << "Add car selected! \n Model:" << Qt::endl;
    //std::cin >> mod;
    scanf(" %s[100]", &mod);
    fflush(stdin);

    QTextStream(stdout) << "Branch:" << Qt::endl;
    //std::cin >> bran;
    scanf(" %s[100]", &bran);
    fflush(stdin);

   // std::cout << mod;

    QNetworkAccessManager *mgr = new QNetworkAccessManager();
    const QUrl url(QStringLiteral("http://localhost:8080/api/car"));
    QNetworkRequest request(url);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QJsonObject obj;
    obj["branch"] = bran;
    obj["model"] = mod;
    QJsonDocument doc(obj);
    QByteArray data = doc.toJson();
    // or
    // QByteArray data("{\"key1\":\"value1\",\"key2\":\"value2\"}");
    QNetworkReply *reply = mgr->post(request, data);

    QObject::connect(reply, &QNetworkReply::finished, [=](){
        if(reply->error() == QNetworkReply::NoError){
            QString contents = QString::fromUtf8(reply->readAll());
            qDebug() << contents;
        }
        else{
            QString err = reply->errorString();
            qDebug() << err;
        }
        reply->deleteLater();
    });
    menu();
    }
void sendRequest(){

  QEventLoop eventLoop;
   QNetworkAccessManager mgr;
    QObject::connect(&mgr, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));


    QNetworkRequest req( QUrl( QString("http://localhost:8080/api/car") ) );
    QNetworkReply *reply = mgr.get(req);
    eventLoop.exec();

    if (reply->error() == QNetworkReply::NoError) {

        qDebug() << "Success" <<reply->readAll();
        delete reply;
    }
    else {

        qDebug() << "Failure" <<reply->errorString();
        delete reply;
    }
    menu();
}
