export class ApiVariables {
    public static localhost = '192.168.1.10:8080';

    public static apiUrlUser = 'http://' + ApiVariables.localhost + '/api/user';
    public static apiUrlAttachment = 'http://' + ApiVariables.localhost + '/api/attachment';
    public static apiUrlBeacon = 'http://' + ApiVariables.localhost + '/api/beacon';
    public static apiUrlMachine = 'http://' + ApiVariables.localhost + '/api/machine';
    public static apiUrlMaintenance = 'http://' + ApiVariables.localhost + '/api/maintenance';
    public static apiUrlStep = 'http://' + ApiVariables.localhost + '/api/step';
    public static apiUrlUserMaintenance = 'http://' + ApiVariables.localhost + '/api/user/maintenace/';
    public static apiUrlZone = 'http://' + ApiVariables.localhost + '/api/zone';
}
