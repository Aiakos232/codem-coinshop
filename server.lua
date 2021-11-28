

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)


Permission = {
        "steam:1100001158a2a55",
        "steam:1100001348700b7"
}
function notAdmin(xPlayer)
    for k,v in pairs(Permission) do
        if v == xPlayer.identifier then
            return false
        end
    end
return true
end


RegisterCommand('coinload', function(source,args)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local steamcik =  args[1]
    local amount = args[2]


    if notAdmin(xPlayer) then
        TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'Insufficient authority'})
    
    else
        if args[1] == nil then 
            TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'You need to login steam account'})
        end
        if args[2] == nil then 
            TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'error', text = 'You need to enter amount'})
    
        else
        MySQL.Async.execute('UPDATE users SET coin = coin+@amount WHERE identifier = @identifier', 
        {
            ['@identifier'] = steamcik,
            ['@amount'] = amount,
        })
        TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Success'})
         end
     
    end
end)




ESX.RegisterServerCallback('coinkontrol', function(source, cb,value)
    local a= {}
    local xPlayer = ESX.GetPlayerFromId(source)
    Citizen.Wait(2000)
    MySQL.Async.fetchAll('SELECT * FROM users WHERE identifier = @identifier', {
        ['@identifier'] = xPlayer.identifier,
    }, function(result)
        
        if(result) then
            if(result[1])then
                cb(result[1].coin)
            else
                cb(0)   
            end
        else
            cb(0)
        end
    end)
end)




RegisterServerEvent('buyvehicledata')
AddEventHandler('buyvehicledata', function(aracmodel,fiyat,newPlate,spawncode)
    
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
    local vehiclePropsjson = json.encode(aracmodel)
    local stateVehicle = 0 
    local spawngarage = true
    if spawngarage then
        stateVehicle = 0
    else
        stateVehicle = 1
    end
    MySQL.Async.execute('INSERT INTO owned_vehicles (owner, vehicle, plate,state) VALUES (@owner, @vehicle,@plate, @state)',
    {
        ['@owner']   = xPlayer.identifier,
        ['@vehicle'] = vehiclePropsjson,
        ['@plate']   = aracmodel.plate,
        ['@state']  = stateVehicle
  
    }, function(result)
        MySQL.Async.execute('UPDATE users SET coin = coin-@fiyat WHERE identifier = @identifier', 
        {
            ['@identifier'] = xPlayer.identifier,
            ['@fiyat'] = fiyat,
        })
    end)
end)
